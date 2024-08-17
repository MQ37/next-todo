"use client";

import Link from "next/link";
import { useAppDispatch } from "../lib/hooks";
import { deauthenticate } from "../lib/actions";
import { useRouter } from "next/navigation";
import { logout } from "../lib/stores/user";
import { UserWithoutPassword } from "../lib/types";

export default function Header({
    user,
}: Readonly<{
    user: UserWithoutPassword | null;
}>) {
    const router = useRouter();

    const dispatch = useAppDispatch();

    return (
        <header className="flex justify-between items-center p-4 h-16">

            {user ? <p>{user.username}</p> : <p>Not logged in</p>}

            <nav>
                <ul className="flex gap-4">

                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>


                {!user ? (
                // unauth
                <>
                    <li>
                        <Link href="/register">
                            Register
                        </Link>
                    </li>

                    <li>
                        <Link href="/login">
                            Log in
                        </Link>
                    </li>
                </>
                ) :
                // user logged in
                (
                <>
                    <li>
                        <Link href="/todo">
                            ToDo
                        </Link>
                    </li>
                    <li>
                        <button onClick={ async () => {
                            await deauthenticate();
                            dispatch(logout());
                            router.push("/");
                        }}>
                            Log out
                        </button>
                    </li>
                </>
                )}


                </ul>
            </nav>
        </header>
    );
}

