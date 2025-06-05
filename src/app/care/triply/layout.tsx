import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
    title: "Triply Care",
    description:
        "Learn how to care for your triply cookware to maintain its quality and performance.",
    keywords: [
        "Rasa Cookware",
        "sustainable cookware",
        "handcrafted cookware",
        "kitchen essentials",
        "culinary excellence",
        "triply cookware",
        "triply care",
        "triply maintenance",
        "triply cookware care",
        "triply cookware maintenance",
        "triply cookware cleaning",
        "triply cookware tips",
        "triply cookware longevity",
        "triply cookware performance",
        "triply cookware guide",
        "triply cookware care guide",
        "triply cookware maintenance guide",
        "triply cookware cleaning guide",
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "Triply Care | Rasa Cookware",
        description:
            "Learn how to care for your triply cookware to maintain its quality and performance.",
        url: `${BASE_URL}/care/triply`,
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
        title: "Triply Care | Rasa Cookware",
        description:
            "Learn how to care for your triply cookware to maintain its quality and performance.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: [`${BASE_URL}/rasa-cookware-logo.png`],
    },
};

export default function TriplyCareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
