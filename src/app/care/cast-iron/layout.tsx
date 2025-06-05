import { Metadata } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
    title: "Cast Iron Care",
    description:
        "Learn how to care for your cast iron cookware to ensure its longevity and performance.",
    keywords: [
        "Rasa Cookware",
        "sustainable cookware",
        "handcrafted cookware",
        "kitchen essentials",
        "culinary excellence",
        "cast iron care",
        "cast iron cookware",
        "cookware maintenance",
        "cooking tips",
        "kitchen care",
        "cast iron maintenance",
        "cast iron seasoning",
        "cast iron cleaning",
        "cast iron longevity",
        "cast iron performance",
        "cast iron tips",
        "cast iron cooking",
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "Cast Iron Care | Rasa Cookware",
        description:
            "Learn how to care for your cast iron cookware to ensure its longevity and performance.",
        url: `${BASE_URL}/care/cast-iron`,
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
        title: "Cast Iron Care | Rasa Cookware",
        description:
            "Learn how to care for your cast iron cookware to ensure its longevity and performance.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: [`${BASE_URL}/rasa-cookware-logo.png`],
    },
};

export default function CastIronCareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
