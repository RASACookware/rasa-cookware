/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { ProductLine } from "@/models/products";

type ProductEditFormProps = {
    productId: string;
};

type Field = {
    id: string;
    label: string;
    value: string | number | "";
    setter: Dispatch<SetStateAction<any>>;
    placeholder?: string;
    required: boolean;
    type: "input" | "textarea";
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    rows?: number;
};

export default function ProductEditForm({ productId }: ProductEditFormProps) {
    const router = useRouter();

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // Original product data from API (for reference)
    const [originalData, setOriginalData] = useState<any>(null);

    // Form states (controlled inputs)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [images, setImages] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<string>("");

    const [material, setMaterial] = useState("");
    const [specialFeatures, setSpecialFeatures] = useState("");
    const [colour, setColour] = useState("");
    const [capacity, setCapacity] = useState("");
    const [compatibleDevices, setCompatibleDevices] = useState("");
    const [productCareInstructions, setProductCareInstructions] = useState("");
    const [handleMaterial, setHandleMaterial] = useState("");
    const [weight, setWeight] = useState("");
    const [itemDimensions, setItemDimensions] = useState("");
    const [isMicrowaveSafe, setIsMicrowaveSafe] = useState(false);
    const [hasNonstickCoating, setHasNonstickCoating] = useState(false);
    const [isDishwasherSafe, setIsDishwasherSafe] = useState(false);
    const [recommendedUsesForProduct, setRecommendedUsesForProduct] =
        useState("");
    const [specificUsesForProduct, setSpecificUsesForProduct] = useState("");
    const [shape, setShape] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [itemModelNumber, setItemModelNumber] = useState("");
    const [ASIN, setASIN] = useState("");
    const [productLine, setProductLine] = useState<ProductLine | "">("");
    const [amazonLink, setAmazonLink] = useState("");

    const [submitting, setSubmitting] = useState(false);

    // Fetch product details on mount
    useEffect(() => {
        if (!productId) {
            setFetchError("Product ID is missing.");
            setLoading(false);
            return;
        }

        async function fetchProduct() {
            setLoading(true);
            setFetchError(null);
            try {
                const res = await fetch(`/api/products/get?id=${productId}`, {
                    credentials: "include",
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(
                        errorData.message || "Failed to fetch product"
                    );
                }
                const { product } = await res.json();

                setOriginalData(product);

                // Initialize form states with product data
                setTitle(product.title || "");
                setDescription(product.description || "");
                setPrice(product.price ?? "");
                setCoverImage(product.coverImage || "");
                // Ensure coverImage is included in images array
                const imgs = product.images || [];
                if (product.coverImage && !imgs.includes(product.coverImage)) {
                    imgs.unshift(product.coverImage);
                }
                setImages(imgs);

                setMaterial(product.material || "");
                setSpecialFeatures(product.specialFeatures || "");
                setColour(product.colour || "");
                setCapacity(product.capacity || "");
                setCompatibleDevices(product.compatibleDevices || "");
                setProductCareInstructions(
                    product.productCareInstructions || ""
                );
                setHandleMaterial(product.handleMaterial || "");
                setWeight(product.weight || "");
                setItemDimensions(product.itemDimensions || "");
                setIsMicrowaveSafe(Boolean(product.isMicrowaveSafe));
                setHasNonstickCoating(Boolean(product.hasNonstickCoating));
                setIsDishwasherSafe(Boolean(product.isDishwasherSafe));
                setRecommendedUsesForProduct(
                    product.recommendedUsesForProduct || ""
                );
                setSpecificUsesForProduct(product.specificUsesForProduct || "");
                setShape(product.shape || "");
                setCountryOfOrigin(product.countryOfOrigin || "");
                setItemModelNumber(product.itemModelNumber || "");
                setASIN(product.ASIN || "");
                setProductLine(product.productLine || "");
                setAmazonLink(product.amazonLink || "");
            } catch (error: any) {
                setFetchError(error.message || "Failed to load product data");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        setSubmitting(true);

        const productData = {
            title,
            description,
            price: Number(price),
            images,
            material,
            specialFeatures,
            colour,
            capacity,
            compatibleDevices,
            productCareInstructions,
            handleMaterial,
            weight,
            itemDimensions,
            isMicrowaveSafe,
            hasNonstickCoating,
            isDishwasherSafe,
            recommendedUsesForProduct,
            specificUsesForProduct,
            shape,
            countryOfOrigin,
            itemModelNumber,
            ASIN,
            productLine,
            amazonLink,
        };

        try {
            console.log("Submitting product data:", productData);

            const response = await fetch(
                `/api/admin/products/edit?id=${productId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`);
                setSubmitting(false);
                return;
            }

            const data = await response.json();

            if (data.error) {
                toast.error(`Error: ${data.error}`);
                setSubmitting(false);
                return;
            }

            toast.success(`${data.message || "Product updated successfully!"}`);
            router.push("/cms/admin/products");
        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error("Failed to submit product");
        } finally {
            setSubmitting(false);
        }
    };

    // Define fields without placeholders, using values only
    const fields: Field[] = [
        {
            id: "title",
            label: "Title",
            value: title,
            setter: setTitle,
            required: true,
            type: "input",
        },
        {
            id: "price",
            label: "Price (INR)",
            value: price,
            setter: setPrice,
            required: true,
            type: "input",
            inputProps: { type: "number", min: 0, step: 0.01 },
        },
        {
            id: "description",
            label: "Description",
            value: description,
            setter: setDescription,
            required: true,
            type: "textarea",
            rows: 4,
        },
        {
            id: "material",
            label: "Material",
            value: material,
            setter: setMaterial,
            required: true,
            type: "input",
        },
        {
            id: "specialFeatures",
            label: "Special Features",
            value: specialFeatures,
            setter: setSpecialFeatures,
            required: true,
            type: "input",
        },
        {
            id: "colour",
            label: "Colour",
            value: colour,
            setter: setColour,
            required: true,
            type: "input",
        },
        {
            id: "capacity",
            label: "Capacity",
            value: capacity,
            setter: setCapacity,
            required: true,
            type: "input",
        },
        {
            id: "compatibleDevices",
            label: "Compatible Devices",
            value: compatibleDevices,
            setter: setCompatibleDevices,
            required: true,
            type: "input",
        },
        {
            id: "productCareInstructions",
            label: "Product Care Instructions",
            value: productCareInstructions,
            setter: setProductCareInstructions,
            required: true,
            type: "input",
        },
        {
            id: "handleMaterial",
            label: "Handle Material",
            value: handleMaterial,
            setter: setHandleMaterial,
            required: true,
            type: "input",
        },
        {
            id: "weight",
            label: "Weight",
            value: weight,
            setter: setWeight,
            required: true,
            type: "input",
        },
        {
            id: "itemDimensions",
            label: "Item Dimensions (LxWxH in cm)",
            value: itemDimensions,
            setter: setItemDimensions,
            required: true,
            type: "input",
        },
        {
            id: "recommendedUsesForProduct",
            label: "Recommended Uses For Product",
            value: recommendedUsesForProduct,
            setter: setRecommendedUsesForProduct,
            required: true,
            type: "input",
        },
        {
            id: "specificUsesForProduct",
            label: "Specific Uses For Product",
            value: specificUsesForProduct,
            setter: setSpecificUsesForProduct,
            required: true,
            type: "input",
        },
        {
            id: "shape",
            label: "Shape",
            value: shape,
            setter: setShape,
            required: true,
            type: "input",
        },
        {
            id: "countryOfOrigin",
            label: "Country of Origin",
            value: countryOfOrigin,
            setter: setCountryOfOrigin,
            required: true,
            type: "input",
        },
        {
            id: "itemModelNumber",
            label: "Item Model Number",
            value: itemModelNumber,
            setter: setItemModelNumber,
            required: true,
            type: "input",
        },
        {
            id: "ASIN",
            label: "ASIN",
            value: ASIN,
            setter: setASIN,
            required: true,
            type: "input",
        },
        {
            id: "amazonLink",
            label: "Amazon Link",
            value: amazonLink,
            setter: setAmazonLink,
            required: true,
            type: "input",
        },
    ];

    // Remove image handler (cannot remove cover image)
    const removeImage = (url: string) => {
        if (url === coverImage) {
            toast.error("Cover image cannot be deleted.");
            return;
        }
        setImages((prev) => prev.filter((img) => img !== url));
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6 text-center text-gray-700">
                Loading product details...
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="max-w-7xl mx-auto p-6 text-center text-red-600">
                Error: {fetchError}
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-7xl mx-auto xl:mt-10 p-6 xl:bg-white md:rounded-lg md:shadow-md space-y-8"
        >
            <h2 className="text-3xl font-semibold text-gray-900 sticky top-0 pb-4 z-10 border-b border-gray-200">
                Edit Product
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(
                    ({
                        id,
                        label,
                        value,
                        setter,
                        required,
                        type,
                        inputProps,
                        rows,
                    }) =>
                        type === "textarea" ? (
                            <div key={id}>
                                <Label
                                    htmlFor={id}
                                    className="text-gray-700 font-medium mb-1"
                                >
                                    {label}
                                </Label>
                                <Textarea
                                    id={id}
                                    value={value as string}
                                    onChange={(e) => setter(e.target.value)}
                                    required={required}
                                    rows={rows || 4}
                                    className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        ) : (
                            <div key={id}>
                                <Label
                                    htmlFor={id}
                                    className="text-gray-700 font-medium mb-1"
                                >
                                    {label}
                                </Label>
                                <Input
                                    id={id}
                                    value={value as string | number}
                                    onChange={(e) => {
                                        if (id === "price") {
                                            const val = e.target.value;
                                            setter(
                                                val === "" ? "" : Number(val)
                                            );
                                        } else {
                                            setter(e.target.value);
                                        }
                                    }}
                                    required={required}
                                    {...inputProps}
                                    className="bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        )
                )}

                {/* Boolean fields */}
                <div className="flex flex-wrap gap-8 mt-6 md:col-span-2">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="checkbox"
                            id="isMicrowaveSafe"
                            checked={isMicrowaveSafe}
                            onChange={(e) =>
                                setIsMicrowaveSafe(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label
                            htmlFor="isMicrowaveSafe"
                            className="text-gray-700 font-medium"
                        >
                            Microwave Safe
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="checkbox"
                            id="hasNonstickCoating"
                            checked={hasNonstickCoating}
                            onChange={(e) =>
                                setHasNonstickCoating(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label
                            htmlFor="hasNonstickCoating"
                            className="text-gray-700 font-medium"
                        >
                            Nonstick Coating
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="checkbox"
                            id="isDishwasherSafe"
                            checked={isDishwasherSafe}
                            onChange={(e) =>
                                setIsDishwasherSafe(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label
                            htmlFor="isDishwasherSafe"
                            className="text-gray-700 font-medium"
                        >
                            Dishwasher Safe
                        </Label>
                    </div>
                </div>

                {/* Select for productLine */}
                <div className="mt-6 max-w-sm md:col-span-2">
                    <Label
                        htmlFor="productLine"
                        className="text-gray-700 font-medium mb-1"
                    >
                        Product Line *
                    </Label>
                    <Select
                        onValueChange={(value: ProductLine) =>
                            setProductLine(value)
                        }
                        value={productLine}
                        name="productLine"
                        required
                    >
                        <SelectTrigger
                            id="productLine"
                            className="w-full bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >
                            <SelectValue placeholder="Select a product line" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900">
                            <SelectItem value="castIronCookware">
                                Cast Iron Cookware
                            </SelectItem>
                            <SelectItem value="triplyCookware">
                                Triply Cookware
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Image upload and thumbnails */}
            <div className="mt-8">
                <CldUploadWidget
                    options={{ sources: ["local"] }}
                    signatureEndpoint={"/api/admin/sign-cloudinary-params"}
                    onSuccess={(result, { widget }) => {
                        const info = result.info as CloudinaryUploadWidgetInfo;

                        if (info && typeof info === "object" && "url" in info) {
                            const uploadedUrl = info.url as string;

                            setImages((prev) => [...prev, uploadedUrl]);
                        }
                    }}
                >
                    {({ open }) => (
                        <Button
                            onClick={() => open()}
                            className="text-white rounded-md px-4 py-2 shadow-md transition"
                        >
                            Upload Images
                        </Button>
                    )}
                </CldUploadWidget>

                {/* Display thumbnails with delete icon */}
                {images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                        {images.map((img, idx) => {
                            const isCover = img === coverImage;
                            return (
                                <div
                                    key={idx}
                                    className={`relative w-20 h-20 rounded-md border ${
                                        isCover
                                            ? "border-indigo-600 ring-2 ring-indigo-500"
                                            : "border-gray-300"
                                    } overflow-hidden`}
                                    title={
                                        isCover
                                            ? "Cover Image (cannot delete)"
                                            : undefined
                                    }
                                >
                                    <img
                                        src={img}
                                        alt={`Uploaded image ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {!isCover && (
                                        <button
                                            type="button"
                                            onClick={() => removeImage(img)}
                                            className="absolute top-1 right-1 cursor-pointer bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-opacity-75 transition"
                                            aria-label={`Remove image ${idx + 1}`}
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full text-white rounded-md px-6 py-3 font-semibold shadow-md transition"
            >
                {submitting ? "Updating..." : "Update Product"}
            </Button>
        </form>
    );
}
