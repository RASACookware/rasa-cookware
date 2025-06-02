/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import {
    Image,
    Plus,
    X,
    Loader2,
    Trash2,
    ExternalLink,
    MoreHorizontal,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { IProduct } from "@/models/products";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

export default function ProductsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/admin/products/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productLine: category || undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch products");
            }

            let filtered = data.products as IProduct[];

            if (productName) {
                filtered = filtered.filter((p) =>
                    p.title.toLowerCase().includes(productName.toLowerCase())
                );
            }

            setProducts(filtered);
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category, productName]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            toast.loading("Deleting product...", {
                id: "delete-product",
            });
            const res = await fetch("/api/admin/products/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: deleteTarget }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to delete product", {
                    id: "delete-product",
                });
            }
            toast.success("Product deleted successfully", {
                id: "delete-product",
            });
            setDeleteTarget(null);
            fetchData();
        } catch (err: any) {
            console.error(err);
            toast.error("Failed to delete product. Please try again.");
        }
    };

    const hasActiveFilters = productName || category;

    return (
        <div className="text-gray-900 font-sans antialiased">
            <div className="max-w-[2000px] mx-auto px-6 py-10">
                <main className="w-full mx-auto justify-center">
                    {/* Header & Add Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight">
                                Products
                            </h1>
                            <p className="text-gray-600 mt-1 text-sm max-w-md">
                                Manage your products and their details here.
                            </p>
                        </div>
                        <Link href="/cms/admin/products/new" passHref>
                            <Button
                                className="bg-black text-white rounded-md px-4 py-2 font-medium
                  hover:bg-gray-900 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Product
                            </Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="bg-gray-50 border border-gray-200 max-w-md rounded-lg p-6 mb-8 shadow-sm">
                        <div className="flex flex-wrap gap-6 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label
                                    htmlFor="category-select"
                                    className="block text-base font-medium text-gray-700 mb-2"
                                >
                                    Category
                                </label>
                                <Select
                                    value={category}
                                    onValueChange={(value) =>
                                        setCategory(value)
                                    }
                                >
                                    <SelectTrigger
                                        id="category-select"
                                        className="rounded-md border border-gray-300 bg-white text-gray-900"
                                    >
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-300 text-gray-900">
                                        <SelectItem value="castIronCookware">
                                            Cast Iron Cookware
                                        </SelectItem>
                                        <SelectItem value="triplyCookware">
                                            Triply Cookware
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {hasActiveFilters && (
                                <div>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setProductName("");
                                            setCategory("");
                                        }}
                                        className="rounded-md border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold text-left">
                                        Name
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold text-left">
                                        Price
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold text-left">
                                        Category
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold text-left">
                                        Amazon Link
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold text-left">
                                        Image
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold text-left">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-12"
                                        >
                                            <div className="flex items-center justify-center gap-2 text-gray-700">
                                                <Loader2 className="animate-spin w-5 h-5" />
                                                Loading products...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : products.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-12"
                                        >
                                            <p className="text-gray-500 font-medium">
                                                No products found
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Try adjusting your filters or
                                                add a new product
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    products.map((product) => (
                                        <TableRow
                                            key={product._id}
                                            className="hover:bg-neutral-100 bg-neutral-50 transition-colors border-b border-gray-200"
                                        >
                                            <TableCell className="text-gray-900 py-3">
                                                {product.title}
                                            </TableCell>
                                            <TableCell className="text-gray-900 py-3">
                                                ₹{product.price}
                                            </TableCell>
                                            <TableCell className="text-gray-900 py-3">
                                                {product.productLine ===
                                                "castIronCookware"
                                                    ? "Cast Iron Cookware"
                                                    : "Triply Cookware"}
                                            </TableCell>
                                            <TableCell className="py-3">
                                                {product.amazonLink ? (
                                                    <Link
                                                        href={
                                                            product.amazonLink
                                                        }
                                                        target="_blank"
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="w-4 h-4 mr-1" />
                                                        Link
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400 italic">
                                                        No link
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="py-3">
                                                {product.coverImage === "" ? (
                                                    <span className="text-gray-400 italic">
                                                        No image
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={
                                                            product.coverImage
                                                        }
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src={
                                                                product.coverImage ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={product.title}
                                                            className="w-16 h-16 rounded-md border border-gray-300 object-cover"
                                                        />
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell className="py-3">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Open menu
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="bg-white border border-gray-200 text-gray-900 shadow-md rounded-md"
                                                    >
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="hover:bg-gray-100 focus:bg-gray-100">
                                                            <Link
                                                                href={
                                                                    "products/set-cover?id=" +
                                                                    product._id
                                                                }
                                                                className="flex items-center gap-2 w-full"
                                                            >
                                                                <Image className="w-4 h-4 text-gray-600" />
                                                                {product.coverImage ===
                                                                "" ? (
                                                                    <span>
                                                                        Set
                                                                        Cover
                                                                        Image
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        Change
                                                                        Cover
                                                                        Image
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <DropdownMenuItem
                                                                    className="text-red-600 hover:text-red-700! cursor-pointer hover:bg-red-100 focus:bg-red-50"
                                                                    onSelect={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        setDeleteTarget(
                                                                            product._id ||
                                                                                null
                                                                        );
                                                                    }}
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-red-600 hover:text-red-700" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white border border-gray-200 text-gray-900 rounded-md shadow-lg">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                                                                        Are you
                                                                        sure?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-600">
                                                                        This
                                                                        will
                                                                        permanently
                                                                        delete
                                                                        &quot;
                                                                        {
                                                                            product.title
                                                                        }
                                                                        &quot;.
                                                                        This
                                                                        action
                                                                        cannot
                                                                        be
                                                                        undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel
                                                                        onClick={() =>
                                                                            setDeleteTarget(
                                                                                null
                                                                            )
                                                                        }
                                                                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 rounded-md px-4 py-2"
                                                                    >
                                                                        Cancel
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={
                                                                            handleDelete
                                                                        }
                                                                        className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 ml-3"
                                                                    >
                                                                        Yes,
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
}
