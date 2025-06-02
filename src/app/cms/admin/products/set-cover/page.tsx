/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ChangeCoverImagePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get("id");

    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [currentCoverImage, setCurrentCoverImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [productName, setProductName] = useState("");

    useEffect(() => {
        if (!productId) return;

        const fetchImages = async () => {
            try {
                const res = await fetch(`/api/products/get?id=${productId}`);
                const data = await res.json();

                if (data?.product?.images?.length) {
                    setImages(data.product.images);
                }

                if (data?.product?.title) {
                    setProductName(data.product.title);
                }

                if (data?.product?.coverImage) {
                    setCurrentCoverImage(data.product.coverImage);
                    setSelectedImage(data.product.coverImage);
                }
            } catch (err) {
                toast.error("Failed to load product data. " + err);
            } finally {
                setFetching(false);
            }
        };

        fetchImages();
    }, [productId]);

    const handleSetCover = async () => {
        if (!selectedImage || !productId || selectedImage === currentCoverImage)
            return;

        setLoading(true);

        try {
            const res = await fetch("/api/admin/products/set-cover", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    coverImage: selectedImage,
                }),
            });

            const data = await res.json();

            if (data?.message === "success") {
                toast.success("Cover image updated successfully.");
                setTimeout(() => {
                    router.push("/cms/admin/products");
                }, 1000);
            } else {
                toast.error(data?.message || "Failed to update cover image.");
            }
        } catch (err) {
            toast.error("Failed to update cover image. " + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto md:mt-10 p-6 md:bg-white md:rounded-lg md:shadow-md">
            <h1 className="text-3xl font-semibold mb-2 text-gray-900">
                Change Cover Image
            </h1>
            <p className="text-gray-500 mb-6">
                {fetching ? "Loading product..." : `Product: ${productName}`}
            </p>

            {fetching ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
                </div>
            ) : images.length === 0 ? (
                <p className="text-gray-500">
                    No images found for this product.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((img) => (
                        <div
                            key={img}
                            className={`relative group rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                                selectedImage === img
                                    ? "border-indigo-600 shadow-lg"
                                    : "border-transparent hover:border-indigo-300"
                            }`}
                            onClick={() => {
                                if (img !== currentCoverImage) {
                                    setSelectedImage(img);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    if (img !== currentCoverImage) {
                                        setSelectedImage(img);
                                    }
                                }
                            }}
                            aria-pressed={selectedImage === img}
                            aria-label={`Select image ${img}`}
                        >
                            <img
                                src={img}
                                alt={`Product image ${img}`}
                                className="w-full h-36 object-cover rounded-md"
                            />
                            {selectedImage === img && (
                                <div className="absolute inset-0 bg-indigo-600/40 flex items-center justify-center text-white font-semibold text-sm rounded-md">
                                    {img === currentCoverImage
                                        ? "Current Cover"
                                        : "Selected"}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8">
                <Button
                    disabled={
                        !selectedImage ||
                        loading ||
                        selectedImage === currentCoverImage
                    }
                    onClick={handleSetCover}
                    className="px-6 py-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Updating...
                        </>
                    ) : (
                        "Update Cover Image"
                    )}
                </Button>
            </div>
        </div>
    );
}
