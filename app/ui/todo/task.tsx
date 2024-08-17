"use client";

import { deleteTask, toggleTask, updateTask } from "@/app/lib/actions";
import { useAlert } from "@/app/lib/hooks/alert";
import type { Task } from "@/app/lib/types";
import { useState } from "react";

export function Task({
    task
}: {
    task: Task;
}) {

    const { addAlert } = useAlert();

    const [ isEditing, setIsEditing ] = useState(false);
    const [ title, setTitle ] = useState(task.title);
    
    function onChange() {
        toggleTask(task.id);
    }

    function onDelete() {
        deleteTask(task.id);
        addAlert("Task deleted ❌", "success");
    }

    function onUpdate() {
        setIsEditing(false);

        if (title === "" || title === task.title) return;

        setTitle(title);
        updateTask(task.id, title);
        addAlert("Task updated ✏️", "success");
    }

    return (
        <div className={"w-full h-16 py-2 px-4 border rounded-md flex justify-between items-center "
        + (task.completed ? "bg-black text-white" : "")
        }>
            <div className="w-2/3 flex items-center gap-4">

                {isEditing ? (
                // Edit mode
                <form onSubmit={onUpdate}>
                <div className="flex items-center gap-4">
                    <button type="submit" className="text-lg font-bold">
                        ✅
                    </button>

                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                </form>
                ) : (
                // View mode
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsEditing(!isEditing)}
                    className="text-lg font-bold"
                    >
                        ✏️
                    </button>

                    <p className="break-words">
                        {title}
                    </p>
                </div>
                )}
            </div>

            <div className="flex gap-4">
                <div>
                    <input type="checkbox" checked={task.completed} onChange={onChange} />
                </div>
                <div>
                    <button onClick={onDelete}
                    className="text-lg font-bold"
                    >
                        ❌
                    </button>
                </div>
            </div>
        </div>
    );
}

