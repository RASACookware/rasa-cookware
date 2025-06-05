import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
    title: "Products",
    description:
        "Explore our range of cast iron and triply cookware designed for culinary excellence. Discover the perfect kitchen essentials for your cooking needs.",
    keywords: [
        "Rasa Cookware",
        "sustainable cookware",
        "handcrafted cookware",
        "kitchen essentials",
        "culinary excellence",
        "premium cookware",
        "cast iron cookware",
        "triply cookware",
        "kitchen innovation",
        "cooking community",
        "cookware craftsmanship",
        "kitchen tools",
        "cooking products",
        "cooking enthusiasts",
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "Products | Rasa Cookware",
        description:
            "Explore our range of cast iron and triply cookware designed for culinary excellence. Discover the perfect kitchen essentials for your cooking needs.",
        url: `${BASE_URL}/products`,
        siteName: "Rasa Cookware",
        images: [
            {
                url: `${BASE_URL}/rasa-cookware-products.webp`,
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
        title: "Products | Rasa Cookware",
        description:
            "Explore our range of cast iron and triply cookware designed for culinary excellence. Discover the perfect kitchen essentials for your cooking needs.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: [`${BASE_URL}/rasa-cookware-products.webp`],
    },
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
