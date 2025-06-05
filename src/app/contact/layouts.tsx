import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Rasa Cookware for inquiries, support, or feedback.",
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
        "cast iron care",
        "triply care",
        "cast iron cookware",
        "triply cookware",
        "cookware",
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "Contact | Rasa Cookware",
        description:
            "Get in touch with Rasa Cookware for inquiries, support, or feedback.",
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
        title: "Contact | Rasa Cookware",
        description:
            "Get in touch with Rasa Cookware for inquiries, support, or feedback.",
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
