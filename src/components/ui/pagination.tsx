"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPrevNext?: boolean;
  maxVisible?: number;
}

/**
 * Professional pagination: Prev, page numbers, Next.
 * Shows up to maxVisible page buttons with ellipsis when needed.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPrevNext = true,
  maxVisible = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  // Build page numbers to show (with ellipsis)
  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    const seen = new Set<number>();
    if (start > 1) {
      pages.push(1);
      seen.add(1);
      if (start > 2) pages.push("ellipsis");
    }
    for (let i = start; i <= end; i++) {
      if (!seen.has(i)) {
        pages.push(i);
        seen.add(i);
      }
    }
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis");
      if (!seen.has(totalPages)) pages.push(totalPages);
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      {showPrevNext && (
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
        >
          Previous
        </Button>
      )}
      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-500">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === currentPage ? "default" : "outline"}
              size="sm"
              className={cn(
                "min-w-[2rem]",
                p === currentPage
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </Button>
          )
        )}
      </div>
      {showPrevNext && (
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNext}
          aria-label="Next page"
        >
          Next
        </Button>
      )}
    </nav>
  );
}
