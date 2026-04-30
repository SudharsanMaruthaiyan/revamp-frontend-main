"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();

  const actionTextMap: Record<string, string> = {
    "/login": "Login ↓",
    "/sign-up": "Sign Up ↓",
    "/forgot-password": "Forgot Password ↓",
    "/reset-password": "Reset Password ↓",
  };

  const actionText = actionTextMap[pathname] ?? "Continue →";

  const points = [
    "Industry-ready MERN curriculum",
    "Training + Internship certification",
    "Real-world projects",
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div
        className="
          relative
          bg-black text-white
          px-6 py-8
          lg:px-12 lg:py-12
          overflow-hidden
          flex flex-col
          lg:min-h-screen
        "
      >
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <Image src="/icon.ico" alt="Revamp Academy" width={28} height={28} />
          <span className="text-base font-semibold">
            Revamp <span className="text-orange-500">Academy</span>
          </span>
        </Link>

        <div className="relative z-10 mt-10 lg:mt-auto mb-0 lg:mb-auto max-w-lg">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-tight">
            MERN Full Stack
            <span className="text-orange-500"> Training + Internship</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-white/80 max-w-md">
            Learn MongoDB, Express, React & Node with real projects and mentorship.
          </p>

          <ul className="mt-5 space-y-2 hidden sm:block">
            {points.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                <span className="text-xs sm:text-sm text-white/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          
          <a
            href="#auth-form"
            className="mt-6 inline-flex w-full sm:w-fit justify-center items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 lg:hidden cursor-pointer"
          >
            {actionText}
          </a>
        </div>
      </div>

      
      <div className="flex items-center justify-center px-6 py-10 lg:py-0">
        <div id="auth-form" className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}