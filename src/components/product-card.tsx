import { IProduct } from "@/models/products";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const ProductCard = ({ product }: { product: IProduct }) => {
    const getProductUrl = (product: IProduct) => {
        const slug =
            product.productLine === "castIronCookware"
                ? "cast-iron-classics"
                : "traya-legacy";

        return `/products/${slug}/${product._id}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden group cursor-pointer"
        >
            <Link href={getProductUrl(product)}>
                <div className="relative h-64 overflow-hidden rounded-md mb-4">
                    <Image
                        src={
                            product.coverImage ||
                            product.images[0] ||
                            "/placeholder.svg?height=300&width=400"
                        }
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-102"
                    />
                </div>
                <div className="text-center">
                    <h3 className="font-aboreto tracking-tight text-xl text-neutral-600">
                        {product.title}
                    </h3>
                    <p className="font-cormorant tracking-wide text-xl text-neutral-600">
                        ₹{product.price}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};
