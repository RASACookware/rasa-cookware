"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, useState } from "react";

type AnimatedUnderlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
};

export default function AnimatedUnderlineButton({
    label,
    className = "",
    ...props
}: AnimatedUnderlineButtonProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            {...props}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative inline-flex items-center cursor-pointer text-white ${className}`}
        >
            {label}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] text-lg w-full bg-current"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: hovered ? 0 : 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
            />
        </button>
    );
}
