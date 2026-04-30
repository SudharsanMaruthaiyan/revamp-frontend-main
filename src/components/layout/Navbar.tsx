"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserNav } from "@/components/layout/UserNav";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Courses", href: "/course" },
];

interface NavbarProps {
  title?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
}

export function Navbar({ actions }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Outer positioner — always fixed, always centered horizontally */
    <div className="fixed top-4 left-0 right-0 z-[60] flex justify-center pointer-events-none px-4">
      <nav
        style={{
          /* width: auto (collapsed) on mobile; on desktop follow scroll state */
          width: scrolled ? "auto" : "auto", 
          /* We'll use CSS classes for width to be more robust for responsiveness */
          transition:
            "width 500ms cubic-bezier(0.34,1.56,0.64,1), " +
            "padding 400ms cubic-bezier(0.34,1.56,0.64,1), " +
            "box-shadow 400ms ease",
        }}
        className={[
          "pointer-events-auto",
          "flex items-center flex-wrap justify-center sm:justify-start",
          "rounded-2xl shrink-0",
          "border border-white/70",
          "bg-white",
          "max-w-full",
          /* On mobile (<md), always use shrunk padding/gap. On desktop (md+), follow scroll. */
          scrolled
            ? "gap-2 px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.14),0_2px_10px_rgba(0,0,0,0.08)]"
            : "md:gap-4 md:px-4 md:py-2.5 gap-2 px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.05)] md:w-[min(900px,100%)]",
        ].join(" ")}
      >
        {/* ── LOGO ── */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group shrink-0"
        >
          <div
            className={[
              "rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0",
              "group-hover:scale-105 transition-transform duration-300",
              scrolled ? "w-8 h-8" : "md:w-10 md:h-10 w-8 h-8",
            ].join(" ")}
            style={{ transition: "width 400ms cubic-bezier(0.34,1.56,0.64,1), height 400ms cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            <Image
              src="/icon.ico"
              alt="Revamp"
              width={scrolled ? 20 : 20}
              height={scrolled ? 20 : 20}
              className="object-contain"
            />
          </div>
          <span
            className={[
              "font-bold tracking-tight text-gray-900 shrink-0",
              scrolled ? "text-[13px]" : "md:text-[15px] text-[13px]",
            ].join(" ")}
            style={{ transition: "font-size 400ms cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            Revamp
          </span>
        </Link>

        {/* ── DIVIDER ── */}
        <div className="w-px h-4 bg-gray-200/80 flex-shrink-0 mx-1" />

        {/* ── NAV LINKS ── */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={[
                "rounded-full font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 tracking-wide whitespace-nowrap",
                scrolled ? "px-2.5 py-1 text-[11px]" : "md:px-3.5 md:py-1.5 px-2.5 py-1 md:text-[12px] text-[11px]",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── SPACER: ONLY on wide state on desktop ── */}
        {!scrolled && <div className="hidden md:flex md:flex-1" />}

        {/* ── RIGHT SECTION ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions && !scrolled && (
            <div className="hidden md:flex items-center gap-2">{actions}</div>
          )}

          {/* Divider */}
          <div className="w-px h-4 bg-gray-200/80" />

          <UserNav />
        </div>
      </nav>
    </div>
  );
}
