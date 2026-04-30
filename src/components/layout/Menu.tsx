"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import {
    ScrollArea,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/shell-primitives";

interface MenuProps {
    isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
    const pathname = usePathname();
    const menuList = getMenuList(pathname);

    return (
        <ScrollArea className="flex-1 [&>div>div[style]]:!block">
            <nav className="h-full w-full">
                <ul className="flex flex-col min-h-full items-start space-y-1 px-2 pb-5">
                    {menuList.map(({ groupLabel, menus }, index) => (
                        <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
                            {(isOpen && groupLabel) || isOpen === undefined ? (
                                <p className="text-[10px] font-bold text-gray-400 px-5 pb-2 uppercase tracking-[0.2em]">
                                    {groupLabel}
                                </p>
                            ) : !isOpen && isOpen !== undefined && groupLabel ? (
                                <TooltipProvider>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger className="w-full">
                                            <div className="w-full flex justify-center items-center">
                                                <Ellipsis className="h-5 w-5" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>{groupLabel}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <p className="pb-2"></p>
                            )}
                            {menus.map(
                                ({ href, label, icon: Icon, active, submenus }, index) =>
                                (
                                    <div className="w-full" key={index}>
                                        <TooltipProvider disableHoverableContent>
                                            <Tooltip delayDuration={100}>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className={cn(
                                                            "w-full h-11 mb-2 group/menu-item relative transition-all duration-300",
                                                            isOpen === false ? "justify-center" : "justify-start px-4",
                                                            ((active === undefined && pathname.startsWith(href)) || active)
                                                                ? "bg-[#F1A33C]/10 text-[#F1A33C] font-bold"
                                                                : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-900"
                                                        )}
                                                        asChild
                                                    >
                                                        <Link href={href} className="flex items-center">
                                                            {((active === undefined && pathname.startsWith(href)) || active) && (
                                                                <div className="absolute left-0 w-1 h-5 bg-[#F1A33C] rounded-r-full" />
                                                            )}
                                                            <span
                                                                className={cn(
                                                                    "transition-transform duration-300 group-hover/menu-item:scale-110",
                                                                    isOpen === false ? "" : "mr-4"
                                                                )}
                                                            >
                                                                <Icon size={20} strokeWidth={((active === undefined && pathname.startsWith(href)) || active) ? 2.5 : 2} />
                                                            </span>
                                                            <p
                                                                className={cn(
                                                                    "max-w-[200px] truncate uppercase tracking-widest text-[11px] font-bold transition-all",
                                                                    isOpen === false
                                                                        ? "-translate-x-96 opacity-0 hidden"
                                                                        : "translate-x-0 opacity-100"
                                                                )}
                                                            >
                                                                {label}
                                                            </p>
                                                        </Link>
                                                    </Button>
                                                </TooltipTrigger>
                                                {isOpen === false && (
                                                    <TooltipContent side="right">
                                                        {label}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                )
                            )}
                        </li>
                    ))}
                    <li className="w-full grow flex items-end pt-5">
                        <TooltipProvider disableHoverableContent>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            // Auth removed
                                        }}
                                        variant="ghost"
                                        className={cn(
                                            "w-full h-11 transition-all duration-300 text-gray-400 hover:text-red-500 hover:bg-red-50/50 group/signout",
                                            isOpen === false ? "justify-center" : "justify-start px-4"
                                        )}
                                    >
                                        <span className={cn("transition-transform group-hover/signout:scale-110", isOpen === false ? "" : "mr-4")}>
                                            <LogOut size={20} strokeWidth={2.5} />
                                        </span>
                                        <p
                                            className={cn(
                                                "whitespace-nowrap uppercase tracking-widest text-[11px] font-bold",
                                                isOpen === false ? "opacity-0 hidden" : "opacity-100"
                                            )}
                                        >
                                            Sign out
                                        </p>
                                    </Button>
                                </TooltipTrigger>
                                {isOpen === false && (
                                    <TooltipContent side="right">Sign out</TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                </ul>
            </nav>
        </ScrollArea>
    );
}