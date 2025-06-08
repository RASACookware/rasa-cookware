/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IProduct } from "@/models/products";
import { ProductSkeleton } from "@/src/components/product-skeleton";
import { ProductCard } from "@/src/components/product-card";
import { toast } from "sonner";
import TextLift from "@/src/components/text-lift";

export default function Page() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products/list-by-category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productLine: "castIronCookware",
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();

                setProducts(data.products);
            } catch (err) {
                toast.error("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative sm:h-[850px] h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1695089027292-da235d9d4c01?q=80&w=3424&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Cast Iron Cookware Background"
                        fill
                        className="object-bottom object-cover brightness-[0.4]"
                        priority
                    />
                    <div className="absolute inset-0 "></div>
                </div>
                <div className="relative z-10 text-center items-center justify-center px-6">
                    <TextLift>
                        <h1 className="text-4xl md:text-6xl font-aboreto text-white drop-shadow-sm">
                            Cast Iron Classics
                        </h1>
                    </TextLift>
                    <TextLift delay={0.2}>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 font-cormorant text-zinc-200 drop-shadow-sm">
                            Discover the timeless beauty and durability of our
                            cast iron cookware. Perfect for every kitchen.
                        </p>
                    </TextLift>
                </div>
            </section>

            {/* bg-[#1a1918] */}

            {/* Product Section */}
            <section className="sm:py-16 grainy py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <TextLift animateOnScroll>
                        <h1 className="text-2xl md:text-4xl mb-12 font-aboreto text-center tracking-tight text-zinc-700 drop-shadow-sm">
                            Our Products
                        </h1>
                    </TextLift>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                        {loading
                            ? Array.from({ length: 3 }).map((_, index) => (
                                  <ProductSkeleton key={index} />
                              ))
                            : products.map((product, index) => (
                                  <motion.div
                                      key={product._id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                          duration: 0.6,
                                          delay: index * 0.1,
                                      }}
                                  >
                                      <ProductCard product={product} />
                                      {index === products.length - 1 || (
                                          <hr className="my-6 mx-auto block md:inline border-black/40 w-40 border-t-2 rounded-full" />
                                      )}
                                  </motion.div>
                              ))}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section>
                {/* === PANIYARAM PAN === */}
                <div className="border-y border-zinc-300 relative overflow-hidden">
                    {/* Background */}
                    <div className="h-[400px] md:h-[550px] relative z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1720414574223-40d393276746?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Paniyaram Pan"
                            fill
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                    </div>

                    {/* Overlay on large, separate content below on small */}
                    <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-start md:px-40 relative z-10 bg-[#101010] md:bg-transparent px-6 py-10">
                        <div className="max-w-lg sm:text-left text-center text-zinc-200">
                            <TextLift animateOnScroll>
                                <h1 className="text-4xl md:text-2xl tracking-wide font-aboreto drop-shadow-sm">
                                    Paniyaram Pan
                                </h1>
                            </TextLift>
                            <TextLift animateOnScroll delay={0.2}>
                                <h3 className="text-xl md:text-lg font-cormorant italic drop-shadow-sm">
                                    Crafted for Crisp, Golden Bites
                                </h3>
                            </TextLift>
                            <TextLift animateOnScroll delay={0.4}>
                                <p className="md:text-lg mt-4 font-cormorant drop-shadow-sm">
                                    Our Cast Iron Paniyaram Pan redefines
                                    traditional South Indian cooking with a
                                    touch of modern finesse. Meticulously
                                    engineered for even heat retention and
                                    delicate browning, each cavity promises
                                    crisp edges and a soft, fluffy center—be it
                                    classic paniyarams, stuffed fritters, or
                                    international mini cakes. The cast iron
                                    surface builds a naturally non-stick layer
                                    over time, making every batch better than
                                    the last. Balanced in hand and timeless in
                                    design, it&apos;s a heritage piece destined
                                    for the heart of your kitchen.
                                </p>
                            </TextLift>
                        </div>
                    </div>
                </div>

                {/* === DOSA TAWA === */}
                <div className="border-y border-zinc-300 relative overflow-hidden">
                    {/* Background */}
                    <div className="h-[400px] md:h-[550px] relative z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1527667455007-10a82aed3892?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Dosa Tawa"
                            fill
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                    </div>

                    {/* Overlay on large, separate content below on small */}
                    <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-end md:px-40 relative z-10 bg-[#101010] md:bg-transparent px-6 py-10">
                        <div className="max-w-lg sm:text-left text-center text-zinc-200">
                            <TextLift animateOnScroll>
                                <h1 className="text-4xl md:text-2xl tracking-wide font-aboreto drop-shadow-sm">
                                    Dosa Tawa
                                </h1>
                            </TextLift>
                            <TextLift animateOnScroll delay={0.2}>
                                <h3 className="text-xl md:text-lg font-cormorant italic drop-shadow-sm">
                                    Where Tradition Meets Precision
                                </h3>
                            </TextLift>
                            <TextLift animateOnScroll delay={0.4}>
                                <p className="md:text-lg mt-4 font-cormorant drop-shadow-sm">
                                    Designed to master the art of the perfect
                                    dosa, this lightweight cast iron tawa is
                                    engineered with a 3mm body—an innovation
                                    that ensures high heat responsiveness
                                    without the traditional bulk. From golden,
                                    paper-thin dosas to soft uttapams and
                                    parathas, the surface seasons beautifully
                                    with each use, creating the ideal base for
                                    naturally non-stick performance. Made for
                                    the everyday ritualist and weekend
                                    perfectionist alike, this tawa turns every
                                    flip into finesse.
                                </p>
                            </TextLift>
                        </div>
                    </div>
                </div>

                {/* === CAST IRON KADAI === */}
                <div className="border-y border-zinc-300 relative overflow-hidden">
                    {/* Background */}
                    <div className="h-[400px] md:h-[550px] relative z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1720414574223-40d393276746?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Paniyaram Pan"
                            fill
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                    </div>

                    {/* Overlay on large, separate content below on small */}
                    <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-start md:px-40 relative z-10 bg-[#101010] md:bg-transparent px-6 py-10">
                        <div className="max-w-lg sm:text-left text-center text-zinc-200">
                            <TextLift animateOnScroll>
                                <h1 className="text-4xl md:text-2xl tracking-wide font-aboreto drop-shadow-sm">
                                    Cast Iron Kadai
                                </h1>
                            </TextLift>
                            <TextLift animateOnScroll delay={0.2}>
                                <h3 className="text-xl md:text-lg font-cormorant italic drop-shadow-sm">
                                    The Soul of Indian Cooking, Reimagined
                                </h3>
                            </TextLift>
                            <TextLift animateOnScroll delay={0.4}>
                                <p className="md:text-lg mt-4 font-cormorant drop-shadow-sm">
                                    Rooted in tradition, elevated for today—our
                                    cast iron kadai is the cornerstone of deep,
                                    soulful cooking. With a depth and curve
                                    designed for stir-frying, slow simmering,
                                    and deep-frying, it transitions effortlessly
                                    from stovetop to table. The 3mm lightweight
                                    build makes it easier to maneuver, without
                                    compromising on the rugged reliability cast
                                    iron is loved for. It&apos;s not just a
                                    vessel. It&apos;s a story of spice, flavor,
                                    and legacy—seasoned with every meal.
                                </p>
                            </TextLift>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
