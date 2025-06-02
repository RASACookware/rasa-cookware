"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101010] px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-md text-center"
            >
                <motion.h1
                    className="text-7xl font-aboreto font-bold text-zinc-100 mb-6"
                    initial={{ y: -50, scale: 0.8 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 10,
                        delay: 0.2,
                    }}
                >
                    404
                </motion.h1>
                <motion.p
                    className="text-lg font-cormorant text-gray-200 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Oops! The page you’re looking for doesn’t exist.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <Link
                        href="/"
                        className="inline-block font-semibold transition-colors"
                    >
                        <Button
                            type={"button"}
                            variant={"outline"}
                            className="px-8 py-3 rounded-lg shadow-md"
                        >
                            Go Home
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
