import { signOutAction } from "../app/actions/signout";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { getCurrentUser } from "@/lib/jwt";

export default async function AuthButton() {
    const user = await getCurrentUser();

    return user ? (
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white text-gray-900
                       hover:bg-gray-50 hover:border-gray-400 transition-colors text-base font-medium leading-6"
                    >
                        <UserIcon className="w-5 h-5 text-gray-600" />
                        <span className="truncate max-w-[180px]">{`Hi, ${user?.email}`}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="bg-white border border-gray-200 text-gray-900 shadow-md rounded-md min-w-[200px] text-base font-medium leading-6"
                >
                    <DropdownMenuLabel className="text-gray-500 text-sm font-semibold px-4 py-2 select-none leading-5">
                        My Dashboard
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="border-gray-200" />

                    <DropdownMenuItem
                        asChild
                        className="w-full cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-md"
                    >
                        <Link
                            href="/cms/admin/products"
                            className="flex items-center gap-2"
                        >
                            Products
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        asChild
                        className="w-full cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-md"
                    >
                        <Link
                            href="/cms/admin/profile"
                            className="flex items-center gap-2"
                        >
                            Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="border-gray-200" />

                    <form action={signOutAction}>
                        <DropdownMenuItem
                            asChild
                            className="w-full cursor-pointer px-4 py-3 focus:bg-red-50 rounded-md"
                        >
                            <button
                                type="submit"
                                className="w-full text-left flex items-center gap-2 text-red-600 font-medium"
                            >
                                Log out
                            </button>
                        </DropdownMenuItem>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ) : (
        <></>
    );
}
