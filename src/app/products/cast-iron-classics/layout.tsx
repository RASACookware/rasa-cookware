import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
    title: "Cast Iron Classics",
    description:
        "Explore our collection of Cast Iron Classics, handcrafted for culinary excellence. Discover the perfect blend of tradition and innovation in cookware.",
    keywords: [
        "Rasa Cookware",
        "sustainable cookware",
        "handcrafted cookware",
        "kitchen essentials",
        "culinary excellence",
        "contact us",
        "customer support",
        "inquiries",
        "feedback",
        "cast iron cookware",
        "cookware",
        "kitchen innovation",
        "cooking community",
        "cookware craftsmanship",
        "kitchen tools",
        "cooking products",
        "cooking enthusiasts",
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "Cast Iron Classics | Rasa Cookware",
        description:
            "Explore our collection of Cast Iron Classics, handcrafted for culinary excellence. Discover the perfect blend of tradition and innovation in cookware.",
        url: `${BASE_URL}/contact`,
        siteName: "Rasa Cookware",
        images: [
            {
                url: `${BASE_URL}/rasa-cookware-logo.png`,
                width: 1200,
                height: 630,
                alt: "Rasa Cookware Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cast Iron Classics | Rasa Cookware",
        description:
            "Explore our collection of Cast Iron Classics, handcrafted for culinary excellence. Discover the perfect blend of tradition and innovation in cookware.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: [`${BASE_URL}/rasa-cookware-logo.png`],
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
