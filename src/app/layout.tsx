import type { Metadata } from "next";
import "./globals.css";
import { Aboreto, Cormorant_Garamond, Inter } from "next/font/google";
import ClientLayoutWrapper from "../components/client-layout-wrapper";
import { ViewTransitions } from "next-view-transitions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "700"], // Adjust as needed
    display: "swap",
    variable: "--font-cormorant",
});

const aboreto = Aboreto({
    subsets: ["latin"],
    weight: "400", // Aboreto has only one weight
    display: "swap",
    variable: "--font-aboreto",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "700"], // Adjust as needed
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "Rasa Cookware",
        template: "%s | Rasa Cookware",
    },
    description:
        "Discover Rasa Cookware - where tradition meets innovation. Explore our handcrafted, sustainable cookware designed for culinary excellence.",
    keywords: [
        "cookware",
        "sustainable cookware",
        "handcrafted cookware",
        "kitchen essentials",
        "culinary excellence",
        "Rasa Cookware",
        "cooking",
        "kitchenware",
        "premium cookware",
        "cast iron cookware",
        "triply cookware",
        "kitchen innovation",
        "cooking community",
        "cookware craftsmanship",
        "kitchen tools",
        "cooking products",
        "cooking enthusiasts",
        "cooking accessories",
        "kitchen gadgets",
        "cooking supplies",
        "kitchen design",
        "cooking techniques",
        "culinary arts",
        "kitchen inspiration",
    ],
    authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
    openGraph: {
        title: "Rasa Cookware",
        description:
            "Discover Rasa Cookware - where tradition meets innovation. Explore our handcrafted, sustainable cookware designed for culinary excellence.",
        url: `${BASE_URL}`,
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
        title: "Rasa Cookware",
        description:
            "Discover Rasa Cookware - where tradition meets innovation. Explore our handcrafted, sustainable cookware designed for culinary excellence.",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        images: [`${BASE_URL}/rasa-cookware-logo.png`],
    },
    metadataBase: new URL(`${BASE_URL}`),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${cormorant.variable} ${aboreto.variable} ${inter.variable}`}
        >
            <body>
                <ViewTransitions>
                    <div
                        id="view-transition-root"
                        style={{ viewTransitionName: "page" }}
                    >
                        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
                    </div>
                </ViewTransitions>
            </body>
        </html>
    );
}
