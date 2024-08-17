"use client";

import { createTask } from "@/app/lib/actions";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";
import { BlackButton } from "../black-button";
import { useAlert } from "@/app/lib/hooks/alert";

export default function CreateTaskForm() {

    const user = useAppSelector((state) => state.user.user);
    const { addAlert } = useAlert();

    const [ title, setTitle ] = useState("");

    async function submit() {
        console.log("submit", title);
        const state = await createTask({ title });

        if (state.error || state.validationErrors) {
            console.log("error", state.error, state.validationErrors);
            return;
        }

        setTitle("");
        addAlert("Task created 👌", "success");
    }

    return (
        <form action={submit}
            className="flex gap-4"
        >
            <input
                type="text"
                placeholder="Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border border-gray-200 rounded"
            />
            <BlackButton type="submit">
                Create
            </BlackButton>

        </form>
    );

}

