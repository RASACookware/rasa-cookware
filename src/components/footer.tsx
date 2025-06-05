import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#101010] text-zinc-300 font-cormorant">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and description */}
                <div className="flex flex-col items-start">
                    <Image
                        src="/rasa-cookware-logo.png"
                        alt="Rasa Cookware Logo"
                        className="h-12 mb-4 invert"
                        width={48}
                        height={48}
                    />
                    <p className="max-w-xs text-zinc-400">
                        Rasa Cookware is dedicated to crafting premium, durable
                        cookware that inspires culinary creativity.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-aboreto text-lg text-white mb-4">
                        Explore
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-white transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about-us"
                                className="hover:text-white transition"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products"
                                className="hover:text-white transition"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/cast-iron-classics"
                                className="hover:text-white transition"
                            >
                                Cast Iron Classics
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/traya-legacy"
                                className="hover:text-white transition"
                            >
                                Traya Legacy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/care/triply"
                                className="hover:text-white transition"
                            >
                                Triply Care
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/care/cast-iron"
                                className="hover:text-white transition"
                            >
                                Cast Iron Care
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="hover:text-white transition"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-aboreto text-lg text-white mb-4">
                        Contact
                    </h3>
                    <p className="text-sm text-zinc-400 mb-2">
                        Email: support@rasacookware.com
                    </p>
                    <p className="text-sm text-zinc-400 mb-2">
                        Phone: +1 123-456-7890
                    </p>
                    <p className="text-sm text-zinc-400">
                        Address: 123 Cookware St, Culinary District, India
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-500 font-cormorant">
                &copy; {currentYear} Rasa Cookware. All rights reserved. <br />
                <span className="block mt-1">Crafted in India.</span>
            </div>
        </footer>
    );
}
