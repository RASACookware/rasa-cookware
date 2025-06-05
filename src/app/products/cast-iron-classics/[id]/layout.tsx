import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cast Iron Care",
    description:
        "Learn how to care for your cast iron cookware to ensure its longevity and performance.",
    keywords: [
        "about us",
        "company info",
        "team",
        "mission",
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
    authors: [
        { name: "Rasa Cookware", url: "https://rasa-cookware.vercel.app" },
    ],
    openGraph: {
        title: "Cast Iron Care",
        description:
            "Learn how to care for your cast iron cookware to ensure its longevity and performance.",
        url: "https://rasa-cookware.vercel.app/care/cast-iron",
        siteName: "Rasa Cookware",
        images: [
            {
                url: "https://rasa-cookware.vercel.app/rasa-cookware-logo.png",
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
        title: "Cast Iron Care",
        description:
            "Learn how to care for your cast iron cookware to ensure its longevity and performance.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: ["https://rasa-cookware.vercel.app/rasa-cookware-logo.png"],
    },
};

export default function CastIronCareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
