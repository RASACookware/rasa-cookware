// components/signup-form.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15,
                ease: "easeOut",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 280, damping: 30 },
        },
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!fullName || !email || !password) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Something went wrong");
            } else {
                toast.success("Account created successfully!");
                setFullName("");
                setEmail("");
                setPassword("");
                router.push("/cms/admin/login");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={cn(
                "backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 p-8 rounded-2xl shadow-lg border border-white/20 dark:border-zinc-700",
                className
            )}
        >
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                {...props}
                noValidate
            >
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-2 text-center"
                >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Create an account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                        Enter your details below to get started
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid gap-5">
                    {/* Full Name */}
                    <div className="grid gap-2">
                        <Label
                            htmlFor="name"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="bg-white/70 dark:bg-zinc-800 transition-all duration-300"
                            autoComplete="name"
                        />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label
                            htmlFor="email"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@gmail.com"
                            required
                            className="bg-white/70 dark:bg-zinc-800 transition-all duration-300"
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2 relative">
                        <Label
                            htmlFor="password"
                            className="text-gray-700 dark:text-gray-300 flex justify-between items-center"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="bg-white/70 dark:bg-zinc-800 transition-all duration-300 pr-10"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full  text-white rounded-md py-3 font-semibold shadow-md transition"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </Button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="text-center text-sm text-gray-600 dark:text-gray-400"
                >
                    Already have an account?{" "}
                    <Link
                        href="/cms/admin/login"
                        className="font-medium underline underline-offset-4 hover:text-blue-600 transition"
                    >
                        Log in
                    </Link>
                </motion.div>
            </form>
        </motion.div>
    );
}
