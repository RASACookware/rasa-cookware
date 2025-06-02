"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import Link from "next/link";
import { Mail } from "lucide-react";

function useScrollAnimation(delay = 0) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return {
        ref,
        style: {
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        },
    };
}

const tips = [
    {
        value: "firstUse",
        title: "First Use",
        content: (
            <>
                Your Rasa Cast Iron is pre-seasoned and ready to cook. But for
                best results, give it a gentle wash with warm water and a soft
                sponge, then dry it completely. Rub a thin layer of vegetable
                oil before first use.
            </>
        ),
    },
    {
        value: "dailyCleaning",
        title: "Daily Cleaning",
        content: (
            <ul className="list-disc pl-5 space-y-1">
                <li>Wash by hand (no dishwashers, please).</li>
                <li>Avoid soap. Just hot water and a scrub brush will do.</li>
                <li>Never soak cast iron.</li>
                <li>After cleaning, dry immediately and thoroughly.</li>
                <li>
                    Wipe with a light coat of oil to prevent rust and keep it
                    seasoned.
                </li>
            </ul>
        ),
    },
    {
        value: "re-seasoning",
        title: "Re-Seasoning (when needed)",
        content: (
            <>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Apply a thin layer of oil on clean cookware.</li>
                    <li>Bake upside down at 180°C (350°F) for 1 hour.</li>
                    <li>Let it cool in the oven.</li>
                </ul>

                <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-300">
                    <h3 className="font-aboreto text-2xl mb-4">
                        Re-Seasoning Your Cast Iron with Onion – The Rasa Ritual
                    </h3>
                    <p className="font-cormorant mb-4">
                        At Rasa Cookware, we believe seasoning isn’t just a
                        chore—it’s a sacred moment, where your hands bring life
                        back to iron, guided by age-old wisdom.
                    </p>

                    <h4 className="font-semibold mb-2">🧅 What You’ll Need:</h4>
                    <ul className="list-disc pl-5 mb-4 space-y-1 font-cormorant">
                        <li>1 medium onion (cut in half or quarters)</li>
                        <li>
                            1–2 tablespoons of oil (we recommend Rasa Cookware’s
                            Edible Seasoning Oil—specially formulated for cast
                            iron)
                        </li>
                        <li>Stove (gas or induction)</li>
                        <li>Paper towel or clean cloth</li>
                        <li>A little time and love</li>
                    </ul>

                    <h4 className="font-semibold mb-2">🔥 Step-by-Step:</h4>
                    <ol className="list-decimal pl-5 space-y-2 font-cormorant">
                        <li>
                            <strong>Warm the Soul (and the Pan):</strong> Place
                            your cast iron cookware on medium heat. Let it come
                            alive with warmth, opening its pores to receive
                            nourishment.
                        </li>
                        <li>
                            <strong>Anoint with Oil:</strong> Pour 1–2
                            tablespoons of Rasa Edible Seasoning Oil—rich in
                            natural compounds that bond beautifully with iron.
                            Spread it evenly across the surface using a brush or
                            paper towel.
                        </li>
                        <li>
                            <strong>
                                Rub with Onion – The Heart of the Ritual:
                            </strong>{" "}
                            Hold a halved onion with tongs or a fork and rub it
                            over the hot surface in gentle, circular motions. As
                            it sizzles and steams, the onion’s natural sulfur
                            and sugars cleanse and deepen the patina of your
                            pan.
                        </li>
                        <li>
                            <strong>Let the Fire Do Its Work:</strong> Continue
                            rubbing for 3–5 minutes. Watch as the surface
                            darkens slightly—a sign that your pan is drinking in
                            strength and flavor.
                        </li>
                        <li>
                            <strong>Cool Down & Wipe:</strong> Switch off the
                            flame and let your cookware cool. Wipe off any
                            excess oil with a clean paper towel.
                        </li>
                    </ol>

                    <p className="mt-4 font-cormorant italic">
                        Every seasoning is a ceremony. Every swirl of the onion,
                        a memory. With Rasa, you don’t just cook—you carry a
                        legacy forward.
                    </p>
                </div>
            </>
        ),
    },
    {
        value: "storage",
        title: "Storage",
        content: (
            <>
                Keep it in a dry place. Place a paper towel inside when stacking
                to absorb moisture.
            </>
        ),
    },
    {
        value: "whatToAvoid",
        title: "What to Avoid",
        content: (
            <ul className="list-disc pl-5 space-y-1">
                <li>
                    Cooking acidic foods for long durations (like tomato sauce).
                </li>
                <li>
                    Drastic temperature changes—never pour cold water on hot
                    cast iron.
                </li>
            </ul>
        ),
    },
];

export default function CastIronCare() {
    const titleAnimation = useScrollAnimation();
    const [openValue, setOpenValue] = useState("firstUse"); // default open
    const reseasoningRef = useRef<HTMLButtonElement>(null);
    const prevOpenValue = useRef<string | null>(null);

    useEffect(() => {
        if (
            prevOpenValue.current === "re-seasoning" && // previously open was re-seasoning
            openValue !== "re-seasoning" && // now closed or changed
            reseasoningRef.current &&
            window.innerWidth < 768 // mobile check
        ) {
            reseasoningRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        prevOpenValue.current = openValue; // update previous value
    }, [openValue]);

    return (
        <div className="min-h-screen bg-white font-cormorant text-gray-900">
            {/* Hero Section */}
            <section className="relative sm:h-[850px] h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1630795842510-0455115f6cca?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Cookware Care"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-6 max-w-4xl"
                >
                    <h1 className="text-4xl md:text-6xl font-aboreto text-gray-100 mb-4">
                        Cookware Care – The Rasa Way
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-cormorant text-gray-300 italic"
                    >
                        Because how you care, is how it lasts.
                    </motion.p>
                </motion.div>
            </section>

            {/* Cast Iron Care Section */}
            <section className="pt-20 px-4 sm:px-6 lg:px-8 grainy">
                <div className="max-w-7xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <motion.div {...titleAnimation}>
                            <h2 className="text-4xl md:text-5xl font-aboreto text-gray-900 mb-4">
                                For Our{" "}
                                <span className="text-amber-600">
                                    Cast Iron Classics
                                </span>{" "}
                                ✨
                            </h2>
                            <p className="text-lg md:text-xl font-cormorant italic text-gray-700">
                                Timeless. Durable. Seasoned by love.
                            </p>
                        </motion.div>
                    </div>

                    {/* Accordion Instructions */}
                    <motion.div
                        {...useScrollAnimation(0.3)}
                        className="max-w-3xl mx-auto"
                    >
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="firstUse"
                            value={openValue}
                            onValueChange={(val) => setOpenValue(val || "")}
                            className="grainy rounded-2xl"
                        >
                            {tips.map(({ value, title, content }, i) => {
                                // const isReseasoning = value === "re-seasoning";
                                return (
                                    <AccordionItem
                                        key={value}
                                        value={value}
                                        className="transition-colors duration-300 ease-in-out"
                                    >
                                        <AccordionTrigger
                                            ref={
                                                value === "re-seasoning"
                                                    ? reseasoningRef
                                                    : null
                                            }
                                            className="text-left text-xl font-aboreto text-gray-900 px-6 py-5 
                    hover:bg-amber-50 focus:bg-amber-100 first:rounded-t-2xl cursor-pointer 
                    select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400 border-none"
                                        >
                                            {i + 1}. {title}
                                        </AccordionTrigger>
                                        <AccordionContent
                                            className="px-6 pt-4 font-cormorant text-lg text-zinc-700 leading-relaxed 
                    bg-amber-50 rounded-b-2xl"
                                        >
                                            {content}
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </motion.div>

                    {/* Harmony Quote */}
                    <motion.div
                        {...useScrollAnimation(0.7)}
                        className="mt-15 text-center"
                    >
                        <div className="bg-gray-900 text-white rounded-3xl p-12 max-w-3xl mx-auto shadow-lg">
                            <p className="text-2xl md:text-3xl font-cormorant italic leading-relaxed">
                                Traya is about{" "}
                                <span className="text-amber-500">harmony</span>
                                —of strength, precision, and care.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Visual Divider
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1462475279937-40cb2b162a99?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Cookware Care"
                        fill
                        className="object-cover brightness-[0.6]"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-black/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl max-w-4xl mx-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-aboreto text-white text-center mb-6">
                            The Art of Cookware Care
                        </h2>
                        <p className="font-cormorant text-lg md:text-xl text-zinc-200 text-center leading-relaxed">
                            Proper care doesn't just extend the life of your
                            cookware—it enhances your cooking experience. When
                            you maintain your Rasa Cast Iron pieces with
                            intention, they reward you with consistent
                            performance and timeless beauty.
                        </p>
                    </motion.div>
                </div>
            </section> */}

            {/* Care Tips Gallery */}
            <section className="pt-15 pb-20 px-4 sm:px-6 lg:px-8 grainy">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-aboreto text-gray-900 mb-4">
                            Care in Action
                        </h2>
                        <p className="font-cormorant text-xl text-gray-700">
                            Visual guides to help you maintain your Traya Legacy
                            cookware
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tip 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1561266555-a67dad63f65d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Proper Cleaning"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-aboreto text-xl text-gray-900 mb-2">
                                    Proper Cleaning
                                </h3>
                                <p className="font-cormorant text-gray-700">
                                    Gentle cleaning with the right tools
                                    preserves both function and beauty.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tip 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1738220543088-aa5b0f83733b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Heat Management"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-aboreto text-xl text-gray-900 mb-2">
                                    Heat Management
                                </h3>
                                <p className="font-cormorant text-gray-700">
                                    Low to medium heat is all you need for
                                    optimal cooking performance.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tip 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1557212060-dd397c79fa5a?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Storage Solutions"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-aboreto text-xl text-gray-900 mb-2">
                                    Storage Solutions
                                </h3>
                                <p className="font-cormorant text-gray-700">
                                    Proper stacking and storage prevents
                                    scratches and maintains finish.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Note from Rasa */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#101010] text-zinc-300">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-aboreto mb-4">
                            A Note from Rasa ❤️
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-[#171717] rounded-3xl p-8 md:p-12 shadow-xl"
                    >
                        <p className="font-cormorant text-xl text-center mb-8 leading-relaxed">
                            Your cookware isn&apos;t just a kitchen
                            tool—it&apos;s part of your story.
                            <br />
                            <span className="font-semibold">
                                Care for it like family, and it will last for
                                generations.
                            </span>
                        </p>

                        <div className="border-t border-[#272626] pt-8 mt-8">
                            <p className="font-cormorant text-lg text-center mb-6">
                                If you ever need help, we&apos;re here.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <Link
                                    href="mailto:support@rasacookware.com"
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full"
                                >
                                    <Mail size={18} />
                                    <span className="font-cormorant">
                                        support@rasacookware.com
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
