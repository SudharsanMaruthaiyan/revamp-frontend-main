"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the path or search params change, show the loader briefly
    // Note: Next.js 13+ App Router doesn't have a built-in event for navigation start/end
    // but we can simulate a premium feel on page transitions.
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] w-full overflow-hidden bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-[#F1A33C] via-[#E0922B] to-[#F1A33C] animate-top-loader shadow-[0_0_8px_rgba(241,163,60,0.5)]" 
        style={{ width: "100%" }}
      />
      <style jsx>{`
        @keyframes top-loader {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-20%); }
          100% { transform: translateX(100%); }
        }
        .animate-top-loader {
          animation: top-loader 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
