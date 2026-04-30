"use client";

import { Navbar } from "@/components/layout/Navbar";

interface CourseNavbarProps {
  courseName: string;
}

/** Thin adapter — delegates to the shared floating Navbar. */
export function CourseNavbar({ courseName }: CourseNavbarProps) {
  return <Navbar title={courseName} />;
}
