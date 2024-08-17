import RegisterForm from "../ui/register-form";

export default function Home() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-center -my-16">

            <h1 className="text-4xl font-bold text-center">
                Create an account
            </h1>

            <div className="pt-8 w-64 break-words">
                <RegisterForm />
            </div>

        </main>
   );
}


