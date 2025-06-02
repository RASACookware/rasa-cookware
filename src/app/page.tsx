"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import TextLift from "../components/text-lift";
import AOS from "aos";
import "aos/dist/aos.css";
import { Marquee } from "../components/magicui/marquee";
import { ReviewCard } from "../components/ui/review-card";

const reviews = [
    {
        name: "Jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/paul",
    },
    {
        name: "John",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/gaultier",
    },
    {
        name: "John",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/max",
    },
    {
        name: "John",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/barry",
    },
    {
        name: "John",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/will",
    },
    {
        name: "John",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/toni",
    },
];

const productLineup = [
    {
        name: "Cast Iron Classics",
        img: "https://images.unsplash.com/photo-1665005499765-45bab6b1dddb?q=80&w=2847&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
            "Explore our range of classic cast iron cookware, designed for durability and performance.",
        link: "/products/cast-iron-classics",
    },
    {
        name: "Traya Legacy",
        img: "https://images.unsplash.com/photo-1665005499765-45bab6b1dddb?q=80&w=2847&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
            "Discover the Traya Legacy collection, where tradition meets modern design.",
        link: "/products/traya-legacy",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export default function Home() {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            mirror: true,
        });
    }, []);

    return (
        <main className="flex grainy flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video/Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 z-10"></div>
                    <Image
                        src="https://ext.same-assets.com/747046185/4060271949.jpeg"
                        alt="Hero Image"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 text-center">
                    <h1 className="text-3xl md:text-5xl mb-6 text-white">
                        <TextLift delay={0.1}>
                            Flavor fully realized in <br />
                            Rasa cast iron.
                        </TextLift>
                    </h1>
                </div>
            </section>

            {/* Product Lineup Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl mb-12 font-aboreto text-center tracking-tight text-zinc-700 drop-shadow-sm">
                        Product Lineup
                    </h1>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 items-center"
                        data-aos="fade-up"
                    >
                        {productLineup.map((product) => (
                            <Link
                                href={product.link}
                                key={product.name}
                                className="group relative flex flex-col items-center justify-center rounded-lg duration-300"
                            >
                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-64 sm:h-72 md:h-64 lg:h-72 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold font-aboreto text-zinc-800 group-hover:text-zinc-600 transition-colors duration-300 text-center">
                                    {product.name}
                                </h2>
                                <p className="text-zinc-600 mt-2 font-cormorant text-justify px-2">
                                    {product.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
                <h2 className="text-3xl md:text-4xl font-aboreto text-center text-gray-900 mb-12">
                    Our Happy Customers
                </h2>

                <div
                    className="relative w-full flex-col sm:flex-row flex items-center justify-center overflow-hidden 
        h-[400px] sm:h-[500px]"
                >
                    {/* Top and bottom gradient masks */}
                    <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10" />

                    {/* Single marquee on small screens */}
                    <div className="w-full sm:hidden">
                        <Marquee
                            pauseOnHover
                            vertical
                            className="[--duration:20s] w-full"
                        >
                            {reviews.map((review) => (
                                <ReviewCard key={review.img} {...review} />
                            ))}
                        </Marquee>
                    </div>

                    {/* Two marquees on sm+ screens */}
                    <div className="hidden sm:flex">
                        <Marquee
                            pauseOnHover
                            vertical
                            className="[--duration:20s]"
                        >
                            {secondRow.map((review) => (
                                <ReviewCard key={review.img} {...review} />
                            ))}
                        </Marquee>
                        <Marquee
                            reverse
                            pauseOnHover
                            vertical
                            className="[--duration:20s]"
                        >
                            {firstRow.map((review) => (
                                <ReviewCard key={review.img} {...review} />
                            ))}
                        </Marquee>
                    </div>
                </div>
            </section>
        </main>
    );
}
