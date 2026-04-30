"use client";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const DEBOUNCE_MS = 300;

export function CourseSearch({
  onDebouncedChange,
  placeholder = "Search courses...",
}: {
  onDebouncedChange: (value: string) => void;
  placeholder?: string;
}) {
  const [local, setLocal] = useState("");
  const debounced = useDebouncedValue(local, DEBOUNCE_MS);

  useEffect(() => {
    onDebouncedChange(debounced);
  }, [debounced, onDebouncedChange]);

  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      className="max-w-sm"
      aria-label="Search courses"
    />
  );
}
