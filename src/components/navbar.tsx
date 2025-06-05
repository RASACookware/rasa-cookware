/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "/" },
    {
        name: "Products",
        href: "/products",
        submenu: [
            { name: "All", href: "/products" },
            {
                name: "Cast Iron Classics",
                href: "/products/cast-iron-classics",
            },
            { name: "Traya Legacy", href: "/products/traya-legacy" },
        ],
    },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    {
        name: "Care",
        href: "/care",
        submenu: [
            { name: "Cast Iron Care", href: "/care/cast-iron" },
            { name: "Triply Care", href: "/care/triply" },
        ],
    },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const router = useTransitionRouter();
    const pathname = usePathname();
    const isHomePage =
        pathname === "/" ||
        pathname === "/about-us" ||
        pathname === "/contact" ||
        pathname === "/products" ||
        pathname === "/products/cast-iron-classics" ||
        pathname === "/products/traya-legacy" ||
        pathname === "/care/triply" ||
        pathname === "/care/cast-iron";

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close mobile menu on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setMobileOpen(false);
                setOpenSubmenu(null);
            }
        }
        if (mobileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileOpen]);

    // Animation for page transition
    const slideInOut = () => {
        const root = document.querySelector("#view-transition-root");
        if (!root) return;

        root.animate(
            [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0.2, transform: "translateY(-35%)" },
            ],
            {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        root.animate(
            [
                { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
            ],
            {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );
    };

    // Handle navigation with transition
    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        setOpenSubmenu(null);
        router.push(href, { onTransitionReady: slideInOut });
    };

    // Variants for mobile menu slide in/out
    const mobileMenuVariants = {
        hidden: {
            x: "100%",
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.3,
            },
        },
        visible: {
            x: 0,
            transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.4,
            },
        },
        exit: {
            x: "100%",
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.3,
            },
        },
    };

    // Variants for submenu dropdown
    const submenuVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.2, ease: "easeInOut" },
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.2, ease: "easeInOut" },
        },
    };

    // Determine navbar background based on scroll and homepage
    const navbarBgClass = isHomePage
        ? scrolled
            ? "bg-neutral-100 shadow-md"
            : "bg-transparent"
        : "bg-white bg-opacity-90 backdrop-blur-md shadow-md";

    // Determine text color based on scroll and homepage
    const textColorClass =
        isHomePage && !scrolled ? "text-white" : "text-gray-700";

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBgClass}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={(e) => handleNavClick(e, "/")}
                    className="flex items-center space-x-3 relative z-20"
                >
                    <Image
                        src="/rasa-cookware-logo.png"
                        alt="Rasa Cookware Logo"
                        className={`h-10 w-auto ${
                            isHomePage && !scrolled ? "invert" : ""
                        }`}
                        width={40}
                        height={40}
                    />
                </Link>

                {/* Desktop Menu */}
                <ul
                    className={`hidden font-aboreto uppercase md:flex space-x-8 font-medium relative ${textColorClass}`}
                >
                    {navLinks.map(({ name, href, submenu }) => (
                        <li key={name} className="relative group">
                            {submenu ? (
                                <>
                                    <motion.button
                                        type="button"
                                        aria-haspopup="true"
                                        aria-expanded={openSubmenu === name}
                                        onMouseEnter={() =>
                                            setOpenSubmenu(name)
                                        }
                                        className="flex items-center gap-1 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {name}
                                        <motion.div
                                            animate={{
                                                rotate:
                                                    openSubmenu === name
                                                        ? 180
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.div>
                                    </motion.button>
                                    <div
                                        className="absolute top-full left-0 pt-2 w-40 z-50"
                                        onMouseEnter={() =>
                                            setOpenSubmenu(name)
                                        }
                                        onMouseLeave={() =>
                                            setOpenSubmenu(null)
                                        }
                                    >
                                        <AnimatePresence>
                                            {openSubmenu === name && (
                                                <motion.ul
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    variants={submenuVariants}
                                                    className="bg-white rounded-md shadow-lg border border-gray-200 py-2"
                                                >
                                                    {submenu.map(
                                                        ({
                                                            name: subName,
                                                            href: subHref,
                                                        }) => (
                                                            <motion.li
                                                                key={subName}
                                                                whileHover={{
                                                                    backgroundColor:
                                                                        "rgba(0,0,0,0.05)",
                                                                }}
                                                                transition={{
                                                                    duration: 0.2,
                                                                }}
                                                            >
                                                                <Link
                                                                    href={
                                                                        subHref
                                                                    }
                                                                    className="block px-4 py-2 text-gray-700 transition-colors"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleNavClick(
                                                                            e,
                                                                            subHref
                                                                        )
                                                                    }
                                                                >
                                                                    {subName}
                                                                </Link>
                                                            </motion.li>
                                                        )
                                                    )}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    // whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href={href}
                                        className={`transition-colors hover:underline ${
                                            pathname === href
                                                ? "underline pb-2"
                                                : ""
                                        }`}
                                        onClick={(e) => handleNavClick(e, href)}
                                    >
                                        {name}
                                    </Link>
                                </motion.div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className={`md:hidden flex font-aboreto items-center justify-center p-2 rounded-md ${textColorClass} hover:text-gray-900 hover:bg-gray-100 transition relative z-20`}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    onClick={() => {
                        setMobileOpen((prev) => !prev);
                        setOpenSubmenu(null);
                    }}
                >
                    <motion.div
                        animate={mobileOpen ? "open" : "closed"}
                        className="w-6 h-6 flex flex-col justify-center items-center"
                    >
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: 45, y: 6 },
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-6 h-0.5 bg-current block transform origin-center"
                        />
                        <motion.span
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-0.5 bg-current block mt-1.5 transform origin-center"
                        />
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: -45, y: -6 },
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-6 h-0.5 bg-current block mt-1.5 transform origin-center"
                        />
                    </motion.div>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                        className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-xl z-[60] p-6 overflow-y-auto"
                        ref={mobileMenuRef}
                    >
                        <motion.div
                            className="flex justify-end mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <button
                                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </motion.div>
                        <motion.ul
                            className="flex flex-col space-y-4 text-gray-800 font-medium text-lg"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.2,
                                    },
                                },
                            }}
                        >
                            {navLinks.map(({ name, href, submenu }, index) => (
                                <motion.li
                                    key={name}
                                    className="flex flex-col font-aboreto"
                                    variants={{
                                        hidden: { opacity: 0, x: 20 },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 0.4,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                >
                                    {submenu ? (
                                        <>
                                            <button
                                                type="button"
                                                className="flex items-center justify-between w-full text-left py-1 hover:text-gray-600 transition-colors"
                                                onClick={() =>
                                                    setOpenSubmenu((prev) =>
                                                        prev === name
                                                            ? null
                                                            : name
                                                    )
                                                }
                                                aria-expanded={
                                                    openSubmenu === name
                                                }
                                                aria-controls={`${name}-submenu-mobile`}
                                            >
                                                <span>{name}</span>
                                                <motion.div
                                                    animate={{
                                                        rotate:
                                                            openSubmenu === name
                                                                ? 180
                                                                : 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <ChevronDown className="w-5 h-5" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {openSubmenu === name && (
                                                    <motion.ul
                                                        id={`${name}-submenu-mobile`}
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                            transition: {
                                                                height: {
                                                                    duration: 0.3,
                                                                    ease: "easeOut",
                                                                },
                                                                opacity: {
                                                                    duration: 0.2,
                                                                    delay: 0.1,
                                                                },
                                                            },
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                            transition: {
                                                                height: {
                                                                    duration: 0.3,
                                                                    ease: "easeInOut",
                                                                },
                                                                opacity: {
                                                                    duration: 0.2,
                                                                },
                                                            },
                                                        }}
                                                        className="overflow-hidden pl-4 mt-2 flex flex-col space-y-2 border-l border-gray-300"
                                                    >
                                                        {submenu.map(
                                                            ({
                                                                name: subName,
                                                                href: subHref,
                                                            }) => (
                                                                <motion.li
                                                                    key={
                                                                        subName
                                                                    }
                                                                    initial={{
                                                                        opacity: 0,
                                                                        x: 10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        x: 0,
                                                                        transition:
                                                                            {
                                                                                duration: 0.3,
                                                                                ease: "easeOut",
                                                                            },
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        x: 10,
                                                                        transition:
                                                                            {
                                                                                duration: 0.2,
                                                                            },
                                                                    }}
                                                                >
                                                                    <Link
                                                                        href={
                                                                            subHref
                                                                        }
                                                                        className="block py-1 text-gray-700 hover:text-gray-900 transition-colors"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            handleNavClick(
                                                                                e,
                                                                                subHref
                                                                            );
                                                                            setMobileOpen(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            subName
                                                                        }
                                                                    </Link>
                                                                </motion.li>
                                                            )
                                                        )}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={href}
                                            className={`block py-2 hover:text-gray-900 transition-colors ${
                                                pathname === href
                                                    ? "font-semibold"
                                                    : ""
                                            }`}
                                            onClick={(e) => {
                                                handleNavClick(e, href);
                                                setMobileOpen(false);
                                            }}
                                        >
                                            {name}
                                        </Link>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
