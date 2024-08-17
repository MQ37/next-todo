"use server";

import prisma from "./prisma";
import bcrypt from "bcrypt";
import { CreateTaskFormSchema, LoginFormSchema, RegisterFormSchema } from "./schemas";
import { Task, UserWithoutPassword, ValidationErrors } from "./types";
import { clearUserSession, getUser, getUserSession, writeUserSession } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from "next/cache";

export type State = {
    error?: string;
    validationErrors?: ValidationErrors;
};

export type UserState = State & {
    user?: UserWithoutPassword;
};

export async function register(
    data: z.infer<typeof RegisterFormSchema>
): Promise<UserState> {
    console.log("Registering user", data);

    const validatedData = RegisterFormSchema.safeParse(data);

    if (!validatedData.success) {
        return { validationErrors: validatedData.error.flatten().fieldErrors };
    }

    if (await prisma.user.findUnique({ where: { username: validatedData.data.username } })) {
        return { error: "This username is already taken" };
    }

    try {
        const user = await prisma.user.create({
            data: {
                username: validatedData.data.username,
                password: await bcrypt.hash(validatedData.data.password, 10),
            },
        });

        return { user: { id: user.id, username: user.username } };
    } catch (e) {
        console.error("Database error", e);
        throw new Error("Failed to register user");
    }
};

export async function authenticate(
    data: z.infer<typeof LoginFormSchema>
): Promise<UserState> {
    console.log("Authenticating user", data.username);
    const validatedData = LoginFormSchema.safeParse(data);

    if (!validatedData.success) {
        return { validationErrors: validatedData.error.flatten().fieldErrors };
    }
    const { username, password } = validatedData.data;
    try{
        const user = await getUser(username);

        if (!user) {
            console.log("User not found");
            return { error: "Failed to log in" }
        }

        // check password in here, cause auth.js throws weird errors when password is wrong
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            console.log("Password doesn't match");
            return { error: "Failed to log in" };
        }

        await writeUserSession({ id: user.id, username: user.username });

        return {
            user: { id: user.id, username: user.username }
        };
    } catch (e) {
        console.error("Login error", e);
        return { error: "Something went wrong" };
    }
}

export async function deauthenticate(): Promise<void> {
    console.log("Deauthenticating user");
    await clearUserSession();
}

export type TaskState = State & {
    tasks?: Task[];
};

export async function createTask(
    data: z.infer<typeof CreateTaskFormSchema>,
): Promise<TaskState> {
    const validatedData = CreateTaskFormSchema.safeParse(data);
    if (!validatedData.success) {
        return { validationErrors: validatedData.error.flatten().fieldErrors };
    }

    const user = await getUserSession();
    if (!user) {
        throw new Error("User not logged in");
    }

    const { title } = validatedData.data;

    console.log("Creating task", title);
    try {
        const task = await prisma.task.create({
            data: {
                title,
                userId: user.id,
                completed: false,
            },
        });

        revalidatePath("/todo");

        return { tasks: [
            { id: task.id, title: task.title, completed: task.completed, userId: task.userId }
        ] };
    } catch (e) {
        console.error("Database error", e);
        return { error: "Failed to create task" };
    }
}

export async function toggleTask(taskId: number): Promise<TaskState> {
    const user = await getUserSession();
    if (!user) {
        return { error: "User not logged in" };
    }

    const task = await prisma.task.findUnique({ where: {
        id: taskId,
        userId: user.id,
    }});
    if (!task) {
        return { error: "Task not found" };
    }

    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { completed: !task.completed },
        });

        revalidatePath("/todo");

        return { tasks: [
            { id: updatedTask.id, title: updatedTask.title, completed: updatedTask.completed, userId: updatedTask.userId }
        ] };
    } catch (e) {
        console.error("Database error", e);
        return { error: "Failed to update task" };
    }
}

export async function deleteTask(taskId: number): Promise<State> {
    const user = await getUserSession();
    if (!user) {
        return { error: "User not logged in" };
    }

    const task = await prisma.task.findUnique({ where: {
        id: taskId,
        userId: user.id,
    }});
    if (!task) {
        return { error: "Task not found" };
    }

    try {
        await prisma.task.delete({ where: { id: taskId } });

        revalidatePath("/todo");

        return { };
    } catch (e) {
        console.error("Database error", e);
        return { error: "Failed to delete task" };
    }
}

export async function updateTask(taskId: number, title: string): Promise<TaskState> {
    const user = await getUserSession();
    if (!user) {
        return { error: "User not logged in" };
    }

    const task = await prisma.task.findUnique({ where: {
        id: taskId,
        userId: user.id,
    }});
    if (!task) {
        return { error: "Task not found" };
    }

    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { title },
        });

        revalidatePath("/todo");

        return { tasks: [
            { id: updatedTask.id, title: updatedTask.title, completed: updatedTask.completed, userId: updatedTask.userId }
        ] };
    } catch (e) {
        console.error("Database error", e);
        return { error: "Failed to update task" };
    }
}

