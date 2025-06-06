"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";

// Custom hook for scroll animations - now only happens once
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

export default function TriplyCookwareCare() {
    const titleAnimation = useScrollAnimation();

    return (
        <div className="min-h-screen">
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
                    <h1 className="text-4xl md:text-6xl font-aboreto text-zinc-200 mb-4">
                        Cookware Care – The Rasa Way
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-cormorant text-zinc-300 italic"
                    >
                        Because how you care, is how it lasts.
                    </motion.p>
                </motion.div>
            </section>

            {/* Traya Legacy Section */}
            <section className="pt-20 px-4 sm:px-6 lg:px-8 grainy">
                <div className="max-w-7xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <motion.div {...titleAnimation}>
                            <h2 className="text-4xl md:text-5xl font-aboreto text-gray-900 mb-4">
                                For Our{" "}
                                <span className="text-amber-600">
                                    Traya Legacy
                                </span>{" "}
                                ✨
                            </h2>
                            <p className="text-lg md:text-xl font-cormorant italic text-gray-700">
                                Three layers. One purpose. Pure performance.
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
                            className="grainy rounded-2xl"
                        >
                            {[
                                {
                                    value: "firstUse",
                                    title: "1. First Use",
                                    content: (
                                        <>
                                            Wash your new{" "}
                                            <span className="font-semibold text-primary">
                                                triply cookware
                                            </span>{" "}
                                            with warm soapy water and a soft
                                            sponge. Dry with a soft cloth.
                                        </>
                                    ),
                                },
                                {
                                    value: "cookingTips",
                                    title: "2. Cooking Tips",
                                    content: (
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>
                                                Use{" "}
                                                <span className="text-primary font-medium">
                                                    low to medium heat
                                                </span>{" "}
                                                for best results.
                                            </li>
                                            <li>
                                                Preheat the pan for a few
                                                seconds before adding oil or
                                                food.
                                            </li>
                                            <li>
                                                Compatible with gas, induction,
                                                and electric stovetops.
                                            </li>
                                        </ul>
                                    ),
                                },
                                {
                                    value: "cleaning",
                                    title: "3. Cleaning",
                                    content: (
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Let it cool before washing.</li>
                                            <li>
                                                Use warm water, mild detergent,
                                                and a soft sponge.
                                            </li>
                                            <li>
                                                For tough stains, make a paste
                                                of baking soda and water. Avoid
                                                harsh scrubbers.
                                            </li>
                                        </ul>
                                    ),
                                },
                                {
                                    value: "shine",
                                    title: "4. Shine Maintenance",
                                    content: (
                                        <>
                                            Use a{" "}
                                            <span className="font-medium text-primary">
                                                stainless steel cleaner
                                            </span>{" "}
                                            occasionally to restore luster and
                                            remove discoloration.
                                        </>
                                    ),
                                },
                                {
                                    value: "dishwasher",
                                    title: "5. Dishwasher Safe",
                                    content: (
                                        <>
                                            Yes, but{" "}
                                            <span className="text-primary font-medium">
                                                hand washing
                                            </span>{" "}
                                            helps retain the shine longer.
                                        </>
                                    ),
                                },
                                {
                                    value: "avoid",
                                    title: "6. What to Avoid",
                                    content: (
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>
                                                Avoid overheating empty pans.
                                            </li>
                                            <li>
                                                Don&apos;t use{" "}
                                                <span className="text-primary font-medium">
                                                    metal utensils
                                                </span>
                                                — opt for wood or silicone to
                                                protect the surface.
                                            </li>
                                        </ul>
                                    ),
                                },
                            ].map(({ value, title, content }) => (
                                <AccordionItem
                                    key={value}
                                    value={value}
                                    className="transition-colors duration-300 ease-in-out"
                                >
                                    <AccordionTrigger
                                        className="text-left text-xl font-aboreto text-gray-900 px-6 py-5 
    hover:bg-amber-50 focus:bg-amber-100 first:rounded-t-2xl cursor-pointer 
    select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400 border-none"
                                    >
                                        {title}
                                    </AccordionTrigger>
                                    <AccordionContent
                                        className="px-6 pt-4 font-cormorant text-lg text-zinc-700 leading-relaxed 
                bg-amber-50 rounded-b-2xl"
                                    >
                                        {content}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>

                    {/* Harmony Quote */}
                    <motion.div
                        {...useScrollAnimation(0.3)}
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
