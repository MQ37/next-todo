import type { Task as TaskType } from "@/app/lib/types";
import { Task } from "./task";

export function TaskList({
    tasks
}: {
   tasks: TaskType[];
}) {
    return (
        <div className="w-full flex flex-col gap-4">
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

