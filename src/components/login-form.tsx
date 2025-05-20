/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { loginAdmin } from "../app/cms/admin/login/action";
import { useRouter } from "next/navigation";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [showPassword, setShowPassword] = useState(false);
    const [pending, startTransition] = useTransition();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleFormAction = (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            toast.error("Both fields are required");
            return;
        }

        startTransition(async () => {
            try {
                await loginAdmin(formData);
                toast.success("Logged in successfully!");
                setEmail("");
                setPassword("");
                router.push("/cms/admin/products");
            } catch (err: any) {
                toast.error(err.message || "Login failed");
            }
        });
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
                action={handleFormAction}
                className="flex flex-col gap-6"
                {...props}
                noValidate
            >
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-2 text-center"
                >
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                        Enter your email below to login to your account
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid gap-5">
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
                            name="email"
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
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="bg-white/70 dark:bg-zinc-800 transition-all duration-300 pr-10"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2  flex h-6 w-6 items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
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
                        disabled={pending}
                        className="w-full  text-white rounded-md py-3 font-semibold shadow-md transition"
                    >
                        <motion.span
                            className="w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {pending ? "Logging in..." : "Login"}
                        </motion.span>
                    </Button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="text-center text-sm text-gray-600 dark:text-gray-400"
                >
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/cms/admin/signup"
                        className="font-medium underline underline-offset-4 hover:text-blue-600  transition"
                    >
                        Sign up
                    </Link>
                </motion.div>
            </form>
        </motion.div>
    );
}
