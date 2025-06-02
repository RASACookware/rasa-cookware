import type React from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import AuthButton from "@/src/components/header-auth";
import { getAuthToken } from "@/lib/jwt";
import { Inter } from "next/font/google";

export const metadata = {
    title: "Rasa Cookware Admin",
    description: "Admin panel for Rasa Cookware",
};

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const token = await getAuthToken();

    return (
        <div
            className={`${inter.className} bg-neutral-100 text-gray-900 font-sans antialiased min-h-screen flex flex-col`}
        >
            {token && (
                <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90 shadow-sm">
                    <div className="container mx-auto flex h-16 items-center px-6 max-w-[2000px]">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors"
                        >
                            <HomeIcon className="h-5 w-5" />
                            <span className="hidden sm:inline-block text-xl font-semibold select-none">
                                Rasa Cookware Admin
                            </span>
                        </Link>
                        <nav className="ml-auto flex items-center space-x-4">
                            <AuthButton />
                        </nav>
                    </div>
                </header>
            )}

            <main className="flex-1 flex justify-center bg-neutral-100">
                <div className="w-full max-w-full">{children}</div>
            </main>
        </div>
    );
}
