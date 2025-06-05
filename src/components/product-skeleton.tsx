import { Skeleton } from "./ui/skeleton";

export const ProductSkeleton = () => (
    <div className="rounded-md shadow-lg overflow-hidden bg-white">
        <Skeleton className="h-54 w-full bg-gray-200" />
        <div className="p-6 space-y-2">
            <Skeleton className="h-6 w-3/4 bg-gray-200" />
            <Skeleton className="h-5 w-1/3 bg-gray-200" />
        </div>
    </div>
);
