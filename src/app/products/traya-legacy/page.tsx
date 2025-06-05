/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IProduct } from "@/models/products";
import { ProductSkeleton } from "@/src/components/product-skeleton";
import { ProductCard } from "@/src/components/product-card";
import { toast } from "sonner";

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
                        productLine: "triplyCookware",
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();

                setProducts(data.products);
            } catch (err) {
                toast.error("Failed to load products. Please try again.");
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
                        src="https://images.unsplash.com/photo-1665005499765-45bab6b1dddb?q=80&w=2847&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Traya Triply Cookware Background"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                    <div className="absolute inset-0 "></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center items-center justify-center px-6"
                >
                    <h1 className="text-4xl md:text-6xl font-aboreto text-white drop-shadow-sm">
                        Traya Legacy Cookware
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto mt-4 font-cormorant text-zinc-200 drop-shadow-sm"
                    >
                        Discover the perfect blend of performance and elegance
                        with our Traya Legacy cookware collection. Crafted for
                        those who appreciate the art of cooking, these triply
                        stainless steel pieces are designed to elevate your
                        culinary experience.
                    </motion.p>
                </motion.div>
            </section>

            {/* bg-[#1a1918] */}

            {/* Product Section */}
            <section className="sm:py-16 py-10 px-4 sm:px-6 lg:px-8 grainy">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-2xl md:text-4xl mb-12 font-aboreto text-center tracking-tight text-zinc-700 drop-shadow-sm">
                        Our Products
                    </h1>
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
                {/* === TRAYA FRYPAN === */}
                <div className="border-y border-zinc-300 relative overflow-hidden">
                    {/* Background */}
                    <div className="h-[400px] md:h-[550px] relative z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1708388064941-de7a9f879bf9?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Traya Frypan"
                            fill
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                    </div>

                    {/* Overlay on large, separate content below on small */}
                    <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-start md:px-40 relative z-10 bg-[#101010] md:bg-transparent px-6 py-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-lg sm:text-left text-center text-zinc-200"
                        >
                            <h1 className="text-4xl md:text-2xl tracking-wide font-aboreto drop-shadow-sm">
                                Traya Frypan
                            </h1>
                            <h3 className="text-xl md:text-lg font-cormorant italic drop-shadow-sm">
                                Effortless Sear. Seamless Elegance.
                            </h3>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="md:text-lg mt-4 font-cormorant drop-shadow-sm"
                            >
                                The Traya Frypan is a study in balance—between
                                responsiveness and restraint, performance and
                                beauty. Crafted with three bonded layers of
                                stainless steel and an aluminum core, it
                                delivers impeccable heat distribution from edge
                                to edge. Whether you&apos;re searing scallops,
                                caramelizing onions, or flipping delicate
                                omelets, every movement is smooth, every finish
                                immaculate. With an ergonomic handle designed
                                for comfort and control, this frypan transforms
                                everyday cooking into a quiet act of precision.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>

                {/* === Traya Kadai with Lid === */}
                <div className="border-y border-zinc-300 relative overflow-hidden">
                    {/* Background */}
                    <div className="h-[400px] md:h-[550px] relative z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1588279102558-dabc7b32d9b1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Traya Kadai with Lid"
                            fill
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                    </div>

                    {/* Overlay on large, separate content below on small */}
                    <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-end md:px-40 relative z-10 bg-[#101010] md:bg-transparent px-6 py-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-lg sm:text-left text-center text-zinc-200"
                        >
                            <h1 className="text-4xl md:text-2xl tracking-wide font-aboreto drop-shadow-sm">
                                Traya Kadai with Lid
                            </h1>
                            <h3 className="text-xl md:text-lg font-cormorant italic drop-shadow-sm">
                                Rooted in Design. Elevated in Performance.
                            </h3>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="md:text-lg mt-4 font-cormorant drop-shadow-sm"
                            >
                                A modern reimagination of the Indian kadai, the
                                Traya triply version balances generous depth
                                with outstanding control. Designed to tackle
                                high-heat stir-fries, deep fries, and rich
                                curries, it holds heat like cast iron—but with
                                the agility and lightness of steel. The
                                ergonomic handles and domed stainless lid make
                                it versatile from stovetop to serveware.
                                It&apos;s where performance meets poise, dish
                                after dish.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>

                {/* === TRAYA SAUCEPAN === */}
                <div className="border-y border-zinc-300 relative overflow-hidden">
                    {/* Background */}
                    <div className="h-[400px] md:h-[550px] relative z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1581442330928-a4189fd7ef57?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Traya Saucepan"
                            fill
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                    </div>

                    {/* Overlay on large, separate content below on small */}
                    <div className="md:absolute md:inset-0 md:flex md:items-center md:justify-start md:px-40 relative z-10 bg-[#101010] md:bg-transparent px-6 py-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-lg sm:text-left text-center text-zinc-200"
                        >
                            <h1 className="text-4xl md:text-2xl tracking-wide font-aboreto drop-shadow-sm">
                                Traya Saucepan
                            </h1>
                            <h3 className="text-xl md:text-lg font-cormorant italic drop-shadow-sm">
                                Quiet Precision. Everyday Grace.
                            </h3>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="md:text-lg mt-4 font-cormorant drop-shadow-sm"
                            >
                                Precision-pouring. Gentle simmering. Confident
                                control. The Traya Saucepan is engineered for
                                the rhythms of everyday cooking—from morning
                                chai to evening reductions. Its triply
                                construction offers unmatched heat stability,
                                eliminating hot spots for perfect sauces,
                                grains, and more. Thoughtfully weighted and
                                elegantly finished, it&apos;s the kind of pan
                                that earns its space on your stovetop—and in
                                your story.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
