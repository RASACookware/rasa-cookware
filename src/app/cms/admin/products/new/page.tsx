/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, Dispatch, SetStateAction } from "react";
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
import { useRouter } from "next/navigation";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

type ProductLine = "castIronCookware" | "triplyCookware";

type Field = {
    id: string;
    label: string;
    value: string | number | "";
    setter: Dispatch<SetStateAction<any>>;
    placeholder: string;
    required: boolean;
    type: "input" | "textarea";
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    rows?: number;
};

export default function ProductCreateForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [images, setImages] = useState<string[]>([]);
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
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            const response = await fetch("/api/admin/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
                credentials: "include",
            });

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

            toast.success("Product added successfully!");
            router.push("/cms/admin/products");
        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error("Failed to submit product");
        } finally {
            setSubmitting(false);
        }
    };

    // Define fields with proper typing
    const fields: Field[] = [
        {
            id: "title",
            label: "Title",
            value: title,
            setter: setTitle,
            placeholder: "Product Title",
            required: true,
            type: "input",
        },
        {
            id: "price",
            label: "Price (INR)",
            value: price,
            setter: setPrice,
            placeholder: "eg., 1200.00",
            required: true,
            type: "input",
            inputProps: { type: "number", min: 0, step: 0.01 },
        },
        {
            id: "description",
            label: "Description *",
            value: description,
            setter: setDescription,
            placeholder: "Product Description",
            required: true,
            type: "textarea",
            rows: 4,
        },
        {
            id: "material",
            label: "Material",
            value: material,
            setter: setMaterial,
            placeholder: "Cast Iron, Stainless Steel, etc.",
            required: true,
            type: "input",
        },
        {
            id: "specialFeatures",
            label: "Special Features",
            value: specialFeatures,
            setter: setSpecialFeatures,
            placeholder: "e.g., Non Stick, Gas Stovetop Compatible",
            required: true,
            type: "input",
        },
        {
            id: "colour",
            label: "Colour",
            value: colour,
            setter: setColour,
            placeholder: "e.g., Black, Silver",
            required: true,
            type: "input",
        },
        {
            id: "capacity",
            label: "Capacity",
            value: capacity,
            setter: setCapacity,
            placeholder: "e.g., 2 Liters",
            required: true,
            type: "input",
        },
        {
            id: "compatibleDevices",
            label: "Compatible Devices",
            value: compatibleDevices,
            setter: setCompatibleDevices,
            placeholder: "e.g., Induction, Gas Stovetop",
            required: true,
            type: "input",
        },
        {
            id: "productCareInstructions",
            label: "Product Care Instructions",
            value: productCareInstructions,
            setter: setProductCareInstructions,
            placeholder: "e.g., Hand wash only, Do not use scrubbers",
            required: true,
            type: "input",
        },
        {
            id: "handleMaterial",
            label: "Handle Material",
            value: handleMaterial,
            setter: setHandleMaterial,
            placeholder: "e.g., Bakelite, Stainless Steel",
            required: true,
            type: "input",
        },
        {
            id: "weight",
            label: "Weight",
            value: weight,
            setter: setWeight,
            placeholder: "e.g., 1.5 kg",
            required: true,
            type: "input",
        },
        {
            id: "itemDimensions",
            label: "Item Dimensions (LxWxH)",
            value: itemDimensions,
            setter: setItemDimensions,
            placeholder: "e.g., 10x8x4",
            required: true,
            type: "input",
        },
        {
            id: "recommendedUsesForProduct",
            label: "Recommended Uses For Product",
            value: recommendedUsesForProduct,
            setter: setRecommendedUsesForProduct,
            placeholder: "e.g., Cooking, Baking",
            required: true,
            type: "input",
        },
        {
            id: "specificUsesForProduct",
            label: "Specific Uses For Product",
            value: specificUsesForProduct,
            setter: setSpecificUsesForProduct,
            placeholder: "e.g., Frying, Boiling",
            required: true,
            type: "input",
        },
        {
            id: "shape",
            label: "Shape",
            value: shape,
            setter: setShape,
            placeholder: "e.g., Round, Square",
            required: true,
            type: "input",
        },
        {
            id: "countryOfOrigin",
            label: "Country of Origin",
            value: countryOfOrigin,
            setter: setCountryOfOrigin,
            placeholder: "e.g., India",
            required: true,
            type: "input",
        },
        {
            id: "itemModelNumber",
            label: "Item Model Number",
            value: itemModelNumber,
            setter: setItemModelNumber,
            placeholder: "e.g., ABC123",
            required: true,
            type: "input",
        },
        {
            id: "ASIN",
            label: "ASIN",
            value: ASIN,
            setter: setASIN,
            placeholder: "e.g., B000123456",
            required: true,
            type: "input",
        },
        {
            id: "amazonLink",
            label: "Amazon Link",
            value: amazonLink,
            setter: setAmazonLink,
            placeholder: "e.g., https://www.amazon.in/dp/B000123456",
            required: true,
            type: "input",
        },
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-7xl mx-auto xl:mt-10 p-6 xl:bg-white md:rounded-lg md:shadow-md space-y-8"
        >
            <h2 className="text-3xl font-semibold text-gray-900 sticky top-0 pb-4 z-10 border-b border-gray-200">
                Add New Product
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(
                    ({
                        id,
                        label,
                        value,
                        setter,
                        placeholder,
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
                                    placeholder={placeholder}
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
                                    placeholder={placeholder}
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

            {/* Image upload button and thumbnails at the end */}
            <div className="mt-8">
                <CldUploadWidget
                    options={{ sources: ["local"] }}
                    signatureEndpoint={"/api/admin/sign-cloudinary-params"}
                    onSuccess={(result, { widget }) => {
                        const info = result.info as CloudinaryUploadWidgetInfo;
                        console.log("Upload result:", info.url);

                        if (info && typeof info === "object" && "url" in info) {
                            const uploadedUrl = info.url as string;

                            setImages((prev) => [...prev, uploadedUrl]);
                        }
                    }}
                >
                    {({ open }) => (
                        <Button
                            onClick={() => open()}
                            className=" text-white rounded-md px-4 py-2 shadow-md transition"
                        >
                            Upload Images
                        </Button>
                    )}
                </CldUploadWidget>

                {/* Display thumbnails */}
                {images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Uploaded image ${idx + 1}`}
                                className="w-20 h-20 object-cover rounded-md border border-gray-300"
                            />
                        ))}
                    </div>
                )}
            </div>

            <Button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full text-white rounded-md px-6 py-3 font-semibold shadow-md transition"
            >
                {submitting ? "Submitting..." : "Add Product"}
            </Button>
        </form>
    );
}
