"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="flex flex-col font-cormorant text-gray-800">
            {/* Hero Section */}
            <div className="relative w-full sm:h-[720px] h-[700px]">
                <Image
                    src="https://images.unsplash.com/photo-1556909172-8c2f041fca1e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Rasa Foundry"
                    fill
                    className="object-cover brightness-[0.4]"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-white text-2xl md:text-6xl font-aboreto text-center px-4"
                    >
                        <span className="block md:inline pb-2">
                            Our Story:{" "}
                        </span>
                        {/* <br className="block md:hidden" /> */}
                        <span className="block md:inline">
                            Where Legacy Meets Flame
                        </span>
                    </motion.h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-12">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl leading-relaxed"
                >
                    <strong className="font-semibold">Rasa</strong>—a word
                    rooted in Sanskrit—means essence, flavor, and sentiment. And
                    that&apos;s exactly what we aim to bring into every kitchen.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl leading-relaxed"
                >
                    Our story begins not in a boardroom, but in the rhythmic
                    clang of a foundry, where molten iron danced to the vision
                    of a man who refused to settle for less.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-6 text-lg md:text-xl leading-relaxed"
                >
                    <p>
                        For over 35 years, my father has lived and breathed cast
                        iron. Not just as a material—but as a craft, an art, and
                        a responsibility.
                    </p>
                    <p>
                        His hands shaped metal with extraordinary precision. His
                        mind, a reservoir of rare knowledge, envisioned what few
                        could dare: a cast iron cookware so refined, so
                        feather-light, that even 3mm thickness could hold
                        strength, durability, and timeless charm.
                    </p>
                    <p>
                        Together, we did what few thought possible. We began
                        casting lightweight cast iron cookware with metal
                        thickness as fine as 3mm—a feat that demanded extreme
                        precision and mastery.
                    </p>
                    <p>
                        That vision—difficult to cast, but impossible to
                        forget—became the soul of Rasa Cookware.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="space-y-6 text-lg md:text-xl leading-relaxed"
                >
                    <p>
                        In 2021, I stepped into this legacy. Inspired by his
                        mastery, I carried a dream of creating a brand that
                        would take Indian craftsmanship to the world. One that
                        didn&apos;t just make cookware—but created heirlooms.
                    </p>
                    <p>
                        Together, we forged Rasa Cookware—a celebration of two
                        worlds:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                        <li>
                            <Link href={"/products/cast-iron-classics"}>
                                <strong>Castiron Classics</strong>
                            </Link>{" "}
                            — The soulful, earthy cookware that brings flavor
                            and tradition alive.
                        </li>
                        <li>
                            <Link href={"/products/traya-legacy"}>
                                <strong>Traya Legacy</strong>
                            </Link>{" "}
                            — Our tribute to innovation: triply stainless steel
                            cookware that complements cast iron with modern
                            elegance.
                        </li>
                    </ul>
                    <p>
                        While the world saw cast iron and triply as rivals, we
                        saw them as companions in a conscious kitchen—each with
                        its own strengths, each with its own rasa.
                    </p>
                </motion.div>

                <motion.blockquote
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="italic border-l-4 pl-4 border-gray-300 text-gray-600"
                >
                    &quot;Because you&apos;re not just buying a pan. You&apos;re
                    taking home a story. You&apos;re owning a piece of legacy.
                    You&apos;re investing in cookware that&apos;s forged in
                    fire, built with purpose, and seasoned with heritage.&quot;
                </motion.blockquote>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-xl font-aboreto mt-12"
                >
                    Welcome to <strong>Rasa</strong>. Where fire meets finesse.
                    Where tradition meets tomorrow. Where every meal begins with
                    meaning.
                </motion.p>
            </section>
        </div>
    );
}
