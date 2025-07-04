// src/app/products/cast-iron-classics/[id]/metadata.ts
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const id = params.id;

    const res = await fetch(`${BASE_URL}/api/products/get?id=${id}`, {
        cache: "force-cache",
        next: { revalidate: 120 },
    });
    if (!res.ok) notFound();

    const data = await res.json();
    const product = data.product;
    if (!product) notFound();

    return {
        title: product.title,
        description:
            product.description?.slice(0, 160) || "Premium cast iron cookware.",
        keywords: [
            "Rasa Cookware",
            `${product.title}`,
            "sustainable cookware",
            "kitchen essentials",
            "culinary excellence",
            "premium cookware",
            "cast iron cookware",
            "kitchen innovation",
            "cooking community",
            "cookware craftsmanship",
            "kitchen tools",
            "cooking products",
            "cooking enthusiasts",
        ],
        authors: [{ name: "Rasa Cookware", url: `${BASE_URL}` }],
        openGraph: {
            title: product.title + " | Rasa Cookware",
            description: product.description?.slice(0, 160),
            url: `${BASE_URL}/products/cast-iron-classics/${id}`,
            images: [
                {
                    url: product.coverImage || "/rasa-cookware-logo.png",
                    width: 1200,
                    height: 630,
                    alt: "Rasa Cookware Logo",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product.title + " | Rasa Cookware",
            description: product.description?.slice(0, 160),
            images: [product.coverImage || "/default-og-image.jpg"],
        },
    };
}
