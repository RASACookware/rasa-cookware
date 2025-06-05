import { Skeleton } from "@/src/components/ui/skeleton";

export default function ProductSkeleton() {
    return (
        <div className="min-h-screen sm:pt-28 pt-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 pb-24 sm:px-6 lg:px-8">
                {/* Breadcrumb skeleton - matches exact spacing */}
                <nav className="flex items-center text-sm mb-6 select-none">
                    <Skeleton className="h-4 w-16" />
                    <div className="w-4 h-4 mx-2">
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                    <div className="w-4 h-4 mx-2">
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-4 w-40" />
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-10 gap-12">
                    {/* Image skeleton - matches exact layout */}
                    <div className="space-y-6">
                        <Skeleton className="aspect-square w-full rounded-2xl" />
                        <div className="flex space-x-3 py-2 px-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="w-20 h-20 rounded-xl flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content skeleton - matches exact spacing */}
                    <div className="flex flex-col">
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-4/5" />
                            <Skeleton className="h-9 w-1/3" />
                        </div>

                        <div className="mt-6">
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-3/4" />
                            </div>
                        </div>

                        {/* Actions skeleton - matches button layout */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Skeleton className="flex-1 h-16 rounded-xl" />
                            <Skeleton className="h-16 w-16 sm:w-auto sm:px-6 rounded-xl" />
                        </div>

                        {/* Accordion skeletons - matches exact spacing */}
                        <div className="mt-12 flex-grow space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-xl"
                                >
                                    <div className="py-6 px-6">
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-6 w-1/3" />
                                            <Skeleton className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
