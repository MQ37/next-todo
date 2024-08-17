import { z } from "zod";

export const RegisterFormSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6)
});

export const LoginFormSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const CreateTaskFormSchema = z.object({
    title: z.string().min(1),
});

