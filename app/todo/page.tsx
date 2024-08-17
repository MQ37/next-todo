import { getTasks } from "../lib/data";
import CreateTaskForm from "../ui/todo/create-form";
import { TaskList } from "../ui/todo/task-list";
import { getUser, getUserSession } from "@/auth";

export default async function Home() {

    const user = await getUserSession();
    const tasks = !!user ? await getTasks(user.id) : [];

    return (
        <main className="flex min-h-screen flex-col items-center p-8 md:w-2/3 lg:w-1/2 mx-auto">

            <h1 className="text-4xl font-bold text-center">
                Next ToDo App
            </h1>

            <p className="text-lg text-center mt-4">
                Tasks you shall complete
            </p>

            <div className="pt-8 w-full">
                <CreateTaskForm />
            </div>

            <div className="pt-8 w-full">
                <TaskList tasks={tasks} />
            </div>

        </main>
   );
}


