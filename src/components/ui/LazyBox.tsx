"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const DEFAULT_ROOT_MARGIN = "100px";

export function LazyBox({
  children,
  rootMargin = DEFAULT_ROOT_MARGIN,
  fallback = null,
}: {
  children: ReactNode;
  rootMargin?: string;
  fallback?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{visible ? children : fallback}</div>;
}
