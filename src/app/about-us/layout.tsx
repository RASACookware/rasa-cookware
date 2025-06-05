import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn more about Rasa Cookware, our mission, and the team behind our handcrafted cookware.",
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
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "About Us | Rasa Cookware",
        description:
            "Learn more about Rasa Cookware, our mission, and the team behind our handcrafted cookware.",
        url: `${BASE_URL}/about-us`,
        siteName: "Rasa Cookware",
        images: [
            {
                url: `${BASE_URL}/rasa-cookware-logo.png`,
                width: 600,
                height: 315,
                alt: "Rasa Cookware Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Rasa Cookware",
        description:
            "Learn more about Rasa Cookware, our mission, and the team behind our handcrafted cookware.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: [`${BASE_URL}/rasa-cookware-logo.png`],
    },
};

export default function AboutUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
