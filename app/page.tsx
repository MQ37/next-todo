import Link from "next/link";

export default function Home() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-center -my-16">

            <h1 className="text-4xl font-bold text-center">
                Next ToDo
            </h1>

            <p className="text-lg text-center mt-4">
                Behold the Next ToDo app built with Next.js
            </p>

            <Link href="/todo" className="mt-8 bg-black text-white rounded-md px-4 py-2">
                Enter the app
            </Link>

        </main>
   );
}

