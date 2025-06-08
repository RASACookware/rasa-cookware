"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextLift from "../components/text-lift";
import AOS from "aos";
import "aos/dist/aos.css";
import { Marquee } from "../components/magicui/marquee";
import { ReviewCard } from "../components/ui/review-card";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "Priya Sharma",
        body: "Absolutely loving the cast iron kadhai with convenient handle. It gives that authentic flavor to sabzis, and the handle makes it super easy to lift even when hot!",
        img: "https://avatar.vercel.sh/priya",
    },
    {
        name: "Arjun Menon",
        body: "Tried the cast iron paniyaram pan—reminded me of my ammachi's cooking in Kerala. Crispy outside, soft inside. A must-have for South Indian homes!",
        img: "https://avatar.vercel.sh/arjun",
    },
    {
        name: "Neha Joshi",
        body: "The triply stainless steel kadhai heats evenly and looks stunning on the stove. I've replaced my old aluminium ones with this. Feels premium and sturdy.",
        img: "https://avatar.vercel.sh/neha",
    },
    {
        name: "Ravi Verma",
        body: "Bought the triply fry pan recently—hands down the best stainless steel pan I've used. No hotspots, no sticking. Omelettes to bhurji, everything just glides.",
        img: "https://avatar.vercel.sh/ravi",
    },
    {
        name: "Sonal Kapoor",
        body: "I didn't expect to love a triply tasla, but Rasa's is perfect for deep frying and big family meals. Easy to clean and heats like a dream.",
        img: "https://avatar.vercel.sh/sonal",
    },
    {
        name: "Karthik Reddy",
        body: "Been using the cast iron dosa tawa every day. Gives perfectly crisp dosas like the ones from Darshinis in Bangalore. Just season it right and it's flawless!",
        img: "https://avatar.vercel.sh/karthik",
    },
    {
        name: "Meera Iyer",
        body: "I've stopped using non-stick after getting the cast iron paniyaram pan. No coating to peel, and it lasts forever. Great investment for traditional cooking.",
        img: "https://avatar.vercel.sh/meera",
    },
    {
        name: "Vivek Agarwal",
        body: "The cast iron kadhai is my go-to for deep frying. Feels like cooking the way my dadi used to. Solid build and unbeatable heat retention!",
        img: "https://avatar.vercel.sh/vivek",
    },
    {
        name: "Pooja Singh",
        body: "Rasa's triply fry pan has become my kitchen hero. I cook everything from parathas to pasta in it. Heats evenly and looks sleek.",
        img: "https://avatar.vercel.sh/pooja",
    },
    {
        name: "Ankit Thakur",
        body: "Honestly, didn't expect much, but the cast iron dosa tawa blew me away. Crispy, evenly browned dosas every time!",
        img: "https://avatar.vercel.sh/ankit",
    },
    {
        name: "Lakshmi Narayan",
        body: "The paniyaram pan from Rasa is a game changer. Even heating and the perfect size. Great for making healthy snacks for the kids.",
        img: "https://avatar.vercel.sh/lakshmi",
    },
    {
        name: "Aarav Desai",
        body: "Rasa's triply kadhai is so thoughtfully designed. My gravies don't stick or burn anymore. Plus, it's easy to clean!",
        img: "https://avatar.vercel.sh/aarav",
    },
    {
        name: "Isha Mehta",
        body: "I love how the triply tasla retains heat during deep frying. Makes me feel like a pro chef every time I cook bhaturas or pakoras.",
        img: "https://avatar.vercel.sh/isha",
    },
    {
        name: "Gaurav Patel",
        body: "Was skeptical at first, but this cast iron kadhai cooks evenly and adds a rich flavor to everything. My rotis and sabzis taste better.",
        img: "https://avatar.vercel.sh/gaurav",
    },
    {
        name: "Shruti Rao",
        body: "Perfect size, traditional charm, and top-notch performance. The paniyaram pan is my weekend breakfast star.",
        img: "https://avatar.vercel.sh/shruti",
    },
    {
        name: "Manoj Kulkarni",
        body: "Cooking on the cast iron dosa tawa reminds me of home. Just like the dosas my aai used to make. Excellent heat distribution.",
        img: "https://avatar.vercel.sh/manoj",
    },
    {
        name: "Deepika Nair",
        body: "The triply fry pan is perfect for everyday cooking. Doesn't warp and stays shiny. Love the quality and weight.",
        img: "https://avatar.vercel.sh/deepika",
    },
    {
        name: "Nikhil Jain",
        body: "I use the triply tasla daily for poha, upma, and even pasta. Lightweight yet solid. Feels like a professional-grade utensil.",
        img: "https://avatar.vercel.sh/nikhil",
    },
    {
        name: "Rekha Sinha",
        body: "Rasa's cast iron kadhai makes me feel connected to my roots. I've recommended it to all my friends and family.",
        img: "https://avatar.vercel.sh/rekha",
    },
    {
        name: "Yusuf Khan",
        body: "The triply stainless steel kadhai is the best investment I made this year. It's become the heart of my kitchen.",
        img: "https://avatar.vercel.sh/yusuf",
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

const product = {
    title: "Rasa Cast Iron Kadhai",
    images: [
        {
            src: "https://images.unsplash.com/photo-1556910633-5099dc3971e8?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Rasa Cast Iron Kadhai - Image 1",
        },
        {
            src: "https://images.unsplash.com/photo-1720414574223-40d393276746?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Rasa Cast Iron Kadhai - Image 2",
        },
        {
            src: "https://images.unsplash.com/photo-1673877483636-57076bc2a469?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Rasa Cast Iron Kadhai - Image 3",
        },
        {
            src: "https://images.unsplash.com/photo-1654327247297-95bd5a98d946?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Rasa Cast Iron Kadhai - Image 4",
        },
        {
            src: "https://images.unsplash.com/photo-1588279102558-dabc7b32d9b1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Rasa Cast Iron Kadhai - Image 5",
        },
    ],
};

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

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (!product) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % product.images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="flex grainy flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Carousel */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {product.images.map((image, index) => (
                        <motion.img
                            key={image.src}
                            src={image.src}
                            alt={image.alt}
                            className={`absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-opacity duration-1000 ease-in-out ${
                                index === currentImage
                                    ? "opacity-100 z-20"
                                    : "opacity-0 z-10"
                            }`}
                            initial={false}
                            animate={{
                                opacity: index === currentImage ? 1 : 0,
                            }}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <div className="relative z-20 text-center">
                    <div className="text-center space-y-3 md:space-y-5">
                        <TextLift>
                            <h1 className="text-xl md:text-4xl lg:text-5xl font-aboreto text-white leading-snug md:leading-tight tracking-tight">
                                <span className="block">
                                    Two Generations. One Vision.
                                </span>
                                <span className="block">
                                    Cookware That Outlasts Time.
                                </span>
                            </h1>
                        </TextLift>

                        <TextLift delay={0.3}>
                            <p className="md:text-lg font-cormorant text-white/80 italic tracking-wide">
                                Rasa —{" "}
                                <span className="text-white/90">
                                    Cast iron heritage. Triply finesse.
                                </span>
                            </p>
                        </TextLift>
                    </div>
                </div>
            </section>

            {/* Product Lineup Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <TextLift animateOnScroll>
                        <h1 className="text-3xl md:text-4xl mb-12 font-aboreto text-center tracking-tight text-zinc-700 drop-shadow-sm">
                            Product Lineup
                        </h1>
                    </TextLift>
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
                <TextLift animateOnScroll>
                    <h2 className="text-2xl md:text-4xl font-aboreto text-center text-gray-900 mb-12">
                        Our Happy Customers
                    </h2>
                </TextLift>

                <div
                    className="relative w-full flex-col sm:flex-row flex items-center justify-center overflow-hidden 
        h-[500px] sm:h-[500px]"
                >
                    {/* Top and bottom gradient masks */}
                    <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10" />

                    {/* Single marquee on small screens */}
                    <div className="w-full sm:hidden">
                        <Marquee
                            pauseOnHover
                            vertical
                            className="[--duration:40s] w-full"
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
                            className="[--duration:30s]"
                        >
                            {secondRow.map((review) => (
                                <ReviewCard key={review.img} {...review} />
                            ))}
                        </Marquee>
                        <Marquee
                            reverse
                            pauseOnHover
                            vertical
                            className="[--duration:30s]"
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
