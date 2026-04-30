"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#F1A33C] border-t-transparent",
        className
      )}
      role="status"
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-10 w-10" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Setting things up...</p>
      </div>
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
