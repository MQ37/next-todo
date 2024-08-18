"use client";

import { useState } from "react";
import { authenticate } from "../lib/actions";
import { LoginFormSchema } from "../lib/schemas";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "../lib/hooks";
import { login } from "../lib/stores/user";
import { BlackButton } from "./black-button";
import { useAlert } from "../lib/hooks/alert";

export default function LoginForm() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { addAlert } = useAlert();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function submit() {
        if (!username || !password) {
            return;
        }

        const validatedData = LoginFormSchema.safeParse({
            username,
            password
        });

        if (!validatedData.success) {
            return;
        }

        const state = await authenticate(validatedData.data);
        console.log("state", state);

        if (state.error) {
            addAlert(state.error, "error");
            return;
        }

        if (!state.user) {
            addAlert("Something went wrong 🙃", "error");
            return;
        }
        
        addAlert("Logged in 👍", "success");
        dispatch(login(state.user));
        router.push("/todo");
    }

    return (

            <form action={submit}
                className="flex flex-col gap-4"
            >

                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <BlackButton type="submit">
                    Log in
                </BlackButton>

            </form>

    );
}

