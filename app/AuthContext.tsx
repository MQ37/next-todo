"use client";

import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useEffect } from "react";
import { UserWithoutPassword } from "./lib/types";
import { login } from "./lib/stores/user";

export default function AuthContext({
  children,
  user,
}: {
  children: React.ReactNode
  user: UserWithoutPassword | null
}) {

    const dispatch = useAppDispatch();

    const userStore = useAppSelector((state) => state.user.user);

    useEffect(() => {
        console.log("userStore", userStore);
        console.log("user", user);
        if (userStore !== undefined) {
            return;
        }

        if (user) {
            console.log("dispatching user", user);
            dispatch(login(user));
        }
    }, [user]);

    return children;
}
