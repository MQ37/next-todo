"use server";

import prisma from "./app/lib/prisma";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionUser, User, UserWithoutPassword } from "./app/lib/types";

export async function getUser(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        return null;
    }

    return {
        id: user.id,
        username: user.username,
        password: user.password,
    };
}

export async function writeUserSession(user: UserWithoutPassword): Promise<void> {
    const session: IronSession<SessionUser> = await getIronSession(cookies(), {
        password: process.env.AUTH_SECRET!,
        cookieName: "auth",
        // for https prod
        //cookieOptions: {
        //    secure: process.env.NODE_ENV === "production",
        //},
    });

    session.user = user;
    await session.save();
}

export async function getUserSession(): Promise<UserWithoutPassword | null> {
    console.log("Getting user session");
    const session: IronSession<SessionUser> = await getIronSession(cookies(), {
        password: process.env.AUTH_SECRET!,
        cookieName: "auth",
    });

    if (!session) {
        return null;
    }

    return session.user;
}

export async function clearUserSession(): Promise<void> {
    const session: IronSession<SessionUser> = await getIronSession(cookies(), {
        password: process.env.AUTH_SECRET!,
        cookieName: "auth",
    });

    session.destroy();
}

