"use client";

import { LogOut, LayoutDashboard, User, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/shell-primitives";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/shell-primitives";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/shell-primitives";
import { signOut, useSession } from "next-auth/react";

export function UserNav() {
    const { data: session } = useSession();
    const userName = session?.user?.name || "User";
    const userInitials = userName.charAt(0).toUpperCase();
    const userEmail = session?.user?.email || "";

    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-10 w-10 rounded-full border-gray-200 hover:border-[#F1A33C]/50 hover:bg-gray-50 transition-all p-0 overflow-hidden shadow-sm"
                            >
                                <Avatar className="h-full w-full">
                                    <AvatarImage src="#" alt="Avatar" />
                                    <AvatarFallback className="bg-[#F1A33C] text-white font-bold">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-64 p-2 rounded-2xl border-gray-100 bg-white shadow-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-bold leading-none text-gray-900">
                            {userName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-50 mx-[-8px] my-2" />
                
                <div className="space-y-1">
                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-gray-50 transition-colors">
                        <Link href="/dashboard" className="flex items-center w-full">
                            <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-900" />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-gray-50 transition-colors">
                        <Link href="/profile" className="flex items-center w-full">
                            <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-900" />
                            <span className="font-medium">Profile Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-gray-50 mx-[-8px] my-2" />
                
                <DropdownMenuItem
                    className="rounded-xl px-3 py-2.5 cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 transition-colors group"
                    onClick={() => {
                        signOut({
                            callbackUrl: "/",
                        });
                    }}
                >
                    <LogOut className="w-4 h-4 mr-3 opacity-70 group-hover:opacity-100" />
                    <span className="font-bold">Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
