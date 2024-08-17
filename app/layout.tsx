import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Header from "./ui/header";
import AuthContext from "./AuthContext";
import { getUserSession } from "@/auth";
import AlertContext from "./AlertContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next ToDo",
   description: "Next awesome todo app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await getUserSession();

    return (
            <html lang="en">
                <StoreProvider>
                <AuthContext user={user}>

                <body className={inter.className}>
                <AlertContext>
                    <Header user={user} />

                    {children}
                </AlertContext>
                </body>

                </AuthContext>
                </StoreProvider>
            </html>
           );
}
