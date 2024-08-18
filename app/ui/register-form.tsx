"use client";

import { useState } from "react";
import { register, UserState } from "../lib/actions";
import { RegisterFormSchema } from "../lib/schemas";
import { ValidationErrors } from "../lib/types";
import { useRouter } from "next/navigation";
import { BlackButton } from "./black-button";
import { useAlert } from "../lib/hooks/alert";

export default function RegisterForm() {

    const router = useRouter();
    const { addAlert } = useAlert();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    async function submit(data: FormData) {
        console.log("submit", data);

        if (!username || !password || !passwordConfirmation) {
            addAlert("All fields are required 😮‍💨", "error");
            return;
        }

        const validatedData = RegisterFormSchema.safeParse({
            username,
            password
        });

        if (password !== passwordConfirmation) {
            addAlert("Passwords do not match 🤨", "error");
            return;
        }

        if (!validatedData.success) {
            setValidationErrors(validatedData.error.flatten().fieldErrors);
            return;
        }
        
        const state: UserState = await register(validatedData.data);

        console.log("state", state);
        if (state.error || state.validationErrors) {
            if (state.error)
                addAlert(state.error, "error");
            setValidationErrors(state.validationErrors || {});

            return;
        }

        if (!state.user) {
            console.error("Something went wrong");
            addAlert("Something went wrong 🙃", "error");
            return;
        }

        console.log("User registered", state.user);
        addAlert("User registered 👌", "success");
        router.push("/login");
    }

    return (

            <form action={submit}
                className="flex flex-col gap-4"
            >

                {
                    validationErrors?.username && 
                    <p className="text-red-500 break-words">
                    {validationErrors.username}
                    </p>
                }
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                {
                    validationErrors?.password &&
                    <p className="text-red-500">
                    {validationErrors.password}
                    </p>
                }
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />

                <BlackButton type="submit">
                    Register
                </BlackButton>

            </form>

    );
}

