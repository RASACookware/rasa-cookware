"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Lenis from "lenis";
import Navbar from "./navbar";
import Footer from "./footer";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isCMSRoute = pathname.startsWith("/cms");

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: true,
            touchMultiplier: 2.0,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Toaster position="top-right" richColors theme="light" />
            {!isCMSRoute && <Navbar />}
            <main>{children}</main>
            {!isCMSRoute && <Footer />}
        </>
    );
}
