import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "ext.same-assets.com",
            "images.unsplash.com",
            "avatar.vercel.sh",
        ],
    },
};

export default nextConfig;
