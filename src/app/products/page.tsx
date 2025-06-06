"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/models/products";
import { DotPattern } from "@/src/components/magicui/dot-pattern";
import { InteractiveHoverButton } from "@/src/components/magicui/interactive-hover-button";
import AnimatedUnderlineButton from "@/src/components/ui/animated-underline-button";
import { ProductCard } from "@/src/components/product-card";
import { ProductSkeleton } from "@/src/components/product-skeleton";
import TextLift from "@/src/components/text-lift";

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products/list");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const castIronProducts = products
        .filter((p) => p.productLine === "castIronCookware")
        .slice(0, 3);
    const triplyProducts = products
        .filter((p) => p.productLine === "triplyCookware")
        .slice(0, 3);

    if (error) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-aboreto text-2xl text-gray-900 mb-2">
                        Something went wrong
                    </h2>
                    <p className="font-cormorant text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grainy">
            {/* Hero Section */}
            <section className="relative sm:h-[850px] h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1622336141805-70c559e141c8?q=80&w=3130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Products Hero Image"
                        fill
                        className="object-bottom object-cover brightness-[0.4]"
                        priority
                    />
                    <div className="absolute inset-0 "></div>
                </div>
                <div className="relative z-10 text-center items-center justify-center px-6">
                    <TextLift delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-aboreto text-white drop-shadow-sm">
                            Our Products
                        </h1>
                    </TextLift>
                    <TextLift delay={0.4}>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 font-cormorant text-zinc-200 drop-shadow-sm">
                            Discover our premium collection of cookware, crafted
                            with precision and designed for culinary excellence.
                            From traditional cast iron to modern triply
                            technology.
                        </p>
                    </TextLift>
                </div>
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center items-center justify-center px-6"
                >
                    <h1 className="text-4xl md:text-6xl font-aboreto text-white drop-shadow-sm">
                        Our Products
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto mt-4 font-cormorant text-zinc-200 drop-shadow-sm"
                    >
                        Discover our premium collection of cookware, crafted
                        with precision and designed for culinary excellence.
                        From traditional cast iron to modern triply technology.
                    </motion.p>
                </motion.div> */}
            </section>

            {/* Cast Iron Classics Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-aboreto text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Cast Iron Classics
                        </h2>
                        <p className="font-cormorant text-lg text-gray-600 max-w-2xl mx-auto">
                            Time-tested cast iron cookware that delivers
                            exceptional heat retention and develops a natural
                            non-stick surface with proper care.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {loading
                            ? Array.from({ length: 3 }).map((_, index) => (
                                  <ProductSkeleton key={index} />
                              ))
                            : castIronProducts.map((product, index) => (
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

                    {!loading && castIronProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center"
                        >
                            <Link href="/products/cast-iron-classics">
                                <InteractiveHoverButton>
                                    Shop now
                                </InteractiveHoverButton>
                                {/* <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-cormorant text-lg transition-all duration-300 hover:shadow-lg">
                                        View All Cast Iron Products
                                    </Button> */}
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Traya Legacy Section */}
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-aboreto text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Traya Legacy
                        </h2>
                        <p className="font-cormorant text-lg text-gray-600 max-w-2xl mx-auto">
                            Advanced triply cookware featuring three layers of
                            metal for superior heat distribution and
                            professional cooking performance.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:mb-8">
                        {loading
                            ? Array.from({ length: 3 }).map((_, index) => (
                                  <ProductSkeleton key={index} />
                              ))
                            : triplyProducts.map((product, index) => (
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

                    {!loading && triplyProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center"
                        >
                            <Link href="/products/traya-legacy">
                                <InteractiveHoverButton>
                                    Shop now
                                </InteractiveHoverButton>
                                {/* <Button className="bg-[#1f1d1b] text-white px-8 py-3 rounded-full font-cormorant text-lg transition-all duration-300 hover:shadow-lg">
                                        View All Traya Legacy Products
                                    </Button> */}
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>
            {/* Call to Action Section */}
            <section className="relative py-20 px-4 sm:px-6 z-0 lg:px-8 bg-[#101010] text-white overflow-hidden">
                {/* Only render the dot pattern here */}
                <div className="absolute inset-0 z-10 sm:[mask-image:radial-gradient(550px_circle_at_center,white,transparent)] [mask-image:radial-gradient(230px_circle_at_center,white,transparent)]">
                    <DotPattern glow={true} />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-aboreto mb-4"
                    >
                        Ready to Cook with the Best?
                    </motion.h2>
                    <p className="font-cormorant text-lg md:text-xl mb-8">
                        Experience the legacy of our finely crafted cookware —{" "}
                        <br className="hidden sm:inline" />
                        designed for those who value tradition and innovation
                        alike.
                    </p>
                    <Link href="/contact">
                        <AnimatedUnderlineButton
                            className="font-cormorant uppercase text-sm sm:text-base tracking-wide"
                            label="Get in touch"
                        />
                    </Link>
                </div>
            </section>
        </div>
    );
}
