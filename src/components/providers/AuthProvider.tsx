"use client";

// Auth has been removed. AuthProvider now just renders children directly.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}