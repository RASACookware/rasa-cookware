"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingCart, Share2, Check, Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import type { IProduct } from "@/models/products";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { ProductSkeleton } from "@/src/components/product-details-skeleton";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shareCopied, setShareCopied] = useState(false);
    const shareTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await fetch(`/api/products/get?id=${id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                setProduct(data.product);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchProductDetails();

        return () => {
            if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current);
        };
    }, [id]);

    // Auto image slideshow every 4 seconds, pause on hover
    useEffect(() => {
        if (!product || isHovered) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % product.images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [product, isHovered]);

    if (isLoading || !product) return <ProductSkeleton />;
    if (error) return <ErrorDisplay message={error} />;

    // Share button handler
    const handleShare = () => {
        const shareText = `Check out this product: ${product.title} - \n${window.location.href}`;
        navigator.clipboard
            .writeText(shareText)
            .then(() => {
                setShareCopied(true);
                toast.success("Product link copied to clipboard!");
                shareTimeoutRef.current = setTimeout(
                    () => setShareCopied(false),
                    2000
                );
            })
            .catch(() => {
                toast.error("Failed to copy link.");
            });
    };

    return (
        <div className="min-h-screen sm:pt-28 pt-24 grainy">
            <div className="max-w-7xl mx-auto px-4 pb-24 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-500 mb-6 select-none">
                    <Link
                        href="/products"
                        className="hover:text-gray-900 transition-colors"
                        tabIndex={-1}
                    >
                        Products
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link
                        href="/products/cast-iron-classics"
                        className="hover:text-gray-900 transition-colors"
                        tabIndex={-1}
                    >
                        Cast Iron Classics
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-gray-900 font-medium truncate max-w-xs">
                        {product.title}
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-10 gap-12">
                    {/* Product Images */}
                    <div
                        className="space-y-6"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Main Image */}
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50 shadow-md border border-gray-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={product.images[currentImage]}
                                    src={product.images[currentImage]}
                                    alt={product.title}
                                    className="absolute inset-0 w-full h-full object-contain p-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeInOut",
                                    }}
                                    loading="eager"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide px-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                                        currentImage === index
                                            ? "border-gray-900 shadow-sm"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${product.title} - View ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        width={80}
                                        height={80}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-cormorant font-semibold text-gray-900 leading-tight">
                                {product.title}
                            </h1>
                            <hr></hr>
                            <p className="text-3xl font-cormorant text-gray-900 font-semibold">
                                <span className="text-base">₹</span>
                                {product.price.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Button
                                onClick={() =>
                                    window.open(product.amazonLink, "_blank")
                                }
                                className="flex-1 rounded-xl px-8 py-6 text-lg bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm"
                                aria-label="Buy on Amazon"
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Buy Now
                            </Button>

                            <Button
                                variant="outline"
                                className="rounded-xl px-6 py-6 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors sm:w-auto"
                                onClick={handleShare}
                                aria-label="Share product"
                            >
                                {shareCopied ? (
                                    <Check className="h-5 w-5 text-green-600" />
                                ) : (
                                    <Share2 className="h-5 w-5 text-gray-600" />
                                )}
                            </Button>
                        </div>

                        {/* Product Details Accordions */}
                        <div className="mt-12 flex-grow">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-4"
                            >
                                <AccordionItem
                                    className="border border-gray-200 rounded-xl"
                                    value="specifications"
                                >
                                    <AccordionTrigger className="text-lg font-cormorant font-semibold py-6 px-6 rounded-xl hover:bg-gray-50 transition-colors">
                                        Specifications
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 sm:pt-6 pt-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.material && (
                                                <DetailItem
                                                    label="Material"
                                                    value={product.material}
                                                />
                                            )}
                                            {product.colour && (
                                                <DetailItem
                                                    label="Colour"
                                                    value={product.colour}
                                                />
                                            )}
                                            {product.capacity && (
                                                <DetailItem
                                                    label="Capacity"
                                                    value={product.capacity}
                                                />
                                            )}
                                            {product.weight && (
                                                <DetailItem
                                                    label="Weight"
                                                    value={product.weight}
                                                />
                                            )}
                                            {product.itemDimensions && (
                                                <DetailItem
                                                    label="Dimensions"
                                                    value={
                                                        product.itemDimensions
                                                    }
                                                />
                                            )}
                                            {product.countryOfOrigin && (
                                                <DetailItem
                                                    label="Country of Origin"
                                                    value={
                                                        product.countryOfOrigin
                                                    }
                                                />
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    className="border border-gray-200 rounded-xl"
                                    value="features"
                                >
                                    <AccordionTrigger className="text-lg font-cormorant font-semibold py-6 px-6 rounded-xl hover:bg-gray-50 transition-colors">
                                        Features & Compatibility
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 sm:pt-6 pt-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.specialFeatures && (
                                                <DetailItem
                                                    label="Special Features"
                                                    value={
                                                        product.specialFeatures
                                                    }
                                                />
                                            )}
                                            {product.compatibleDevices && (
                                                <DetailItem
                                                    label="Compatible Devices"
                                                    value={
                                                        product.compatibleDevices
                                                    }
                                                />
                                            )}
                                            {product.handleMaterial && (
                                                <DetailItem
                                                    label="Handle Material"
                                                    value={
                                                        product.handleMaterial
                                                    }
                                                />
                                            )}
                                            {product.isMicrowaveSafe && (
                                                <DetailItem
                                                    label="Microwave Safe"
                                                    value="Yes"
                                                />
                                            )}
                                            {product.hasNonstickCoating && (
                                                <DetailItem
                                                    label="Non-stick Coating"
                                                    value="Yes"
                                                />
                                            )}
                                            {product.isDishwasherSafe && (
                                                <DetailItem
                                                    label="Dishwasher Safe"
                                                    value="Yes"
                                                />
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    className="border border-gray-200 rounded-xl"
                                    value="care"
                                >
                                    <AccordionTrigger className="text-lg font-cormorant font-semibold py-6 px-6 rounded-xl hover:bg-gray-50 transition-colors">
                                        Care Instructions
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 sm:pt-6 pt-3">
                                        <div className="space-y-3">
                                            {product.productCareInstructions ? (
                                                <p className="text-gray-700 leading-relaxed">
                                                    {
                                                        product.productCareInstructions
                                                    }
                                                </p>
                                            ) : (
                                                <p className="italic text-gray-500">
                                                    No specific care
                                                    instructions provided.
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-600 italic antialiased">
                                                For detailed care instructions,{" "}
                                                <Link
                                                    href="/care/cast-iron"
                                                    target="_blank"
                                                    className="text-gray-900 underline hover:no-underline transition-all"
                                                >
                                                    visit our care guide
                                                </Link>
                                                .
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>

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

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
            <p className="text-gray-900 font-medium">{value}</p>
        </div>
    );
}

function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                    <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-cormorant font-semibold text-gray-900 mb-3">
                    Something went wrong
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>
                <Button
                    onClick={() => (window.location.href = "/products")}
                    className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white px-6 py-3"
                >
                    Return to Products
                </Button>
            </div>
        </div>
    );
}
