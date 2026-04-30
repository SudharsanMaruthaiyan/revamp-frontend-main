import { Suspense } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { TopLoader } from "@/components/layout/TopLoader";

export const metadata: Metadata = {
  title: "Revamp",
  description: "Revamp web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-product-sans antialiased"
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <QueryProvider>
            <Suspense>
              <TopLoader />
            </Suspense>
            {children}
            <Toaster richColors position="top-right" closeButton />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}