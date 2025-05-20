/* eslint-disable @next/next/no-img-element */
// pages/signup.tsx (or wherever your page is)
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/src/components/signup-form";

export default function SignupPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* Left Side - Image and Quote */}
            <div className="relative hidden lg:flex flex-col justify-between bg-neutral-100">
                {/* Top Logo */}
                <div className="p-10 z-10">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold text-gray-900 transition-opacity duration-300 hover:opacity-80"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black shadow-md text-white">
                            <GalleryVerticalEnd className="h-6 w-6" />
                        </div>
                        <span className="text-xl select-none">
                            Rasa Cookware
                        </span>
                    </Link>
                </div>

                {/* Background Image */}
                <img
                    src="/signup1.jpg"
                    alt="Cookware background"
                    className="absolute inset-0 z-0 h-full w-full object-cover brightness-90"
                    loading="lazy"
                />

                {/* Bottom Quote */}
                <div className="relative z-20 p-10 rounded-tl-3xl m-4 max-w-xl ">
                    <blockquote className="space-y-3">
                        <p className="text-xl font-semibold italic text-gray-800">
                            &quot;Join us in redefining the cookware experience
                            with premium quality and innovative design.&quot;
                        </p>
                        <footer className="text-sm font-semibold text-gray-600">
                            Rasa Team
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex flex-col gap-6 p-6 md:p-12 bg-white dark:bg-zinc-900">
                {/* Mobile Logo */}
                <div className="flex justify-center lg:hidden gap-2 md:justify-start mb-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white transition-opacity duration-300 hover:opacity-80"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600 shadow-md text-white">
                            <GalleryVerticalEnd className="h-6 w-6" />
                        </div>
                        <span className="text-xl select-none">
                            Rasa Cookware
                        </span>
                    </Link>
                </div>

                {/* Form */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
