import prisma from "./prisma";
import { Task } from "./types";

export async function getTasks(userId: number): Promise<Task[]> {
    return prisma.task.findMany({
        where: { userId },
        orderBy: [
            { completed: "asc" },
            { id: "desc" }
        ],
    });
}

