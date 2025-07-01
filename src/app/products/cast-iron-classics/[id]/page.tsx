import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "../../ProductPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// ✅ Force dynamic rendering to allow metadata to be fetched on server
export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const id = (await params).id;

    const res = await fetch(`${BASE_URL}/api/products/get?id=${id}`, {
        cache: "no-store",
    });
    if (!res.ok) notFound();

    const data = await res.json();
    const product = data.product;
    if (!product) notFound();

    return {
        title: `${product.title} | Rasa Cookware`,
        description: product.description?.slice(0, 160),
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
        openGraph: {
            title: product.title + " | Rasa Cookware",
            description: product.description?.slice(0, 160),
            url: `${BASE_URL}/products/cast-iron-classics/${id}`,
            images: [
                {
                    url: product.coverImage || "/default-og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Rasa Cookware",
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

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    const res = await fetch(`${BASE_URL}/api/products/get?id=${id}`, {
        cache: "force-cache",
        next: { revalidate: 120 },
    });
    if (!res.ok) notFound();

    const data = await res.json();
    const product = data.product;

    if (!product) notFound();

    return <ProductPageClient product={product} />;
}
