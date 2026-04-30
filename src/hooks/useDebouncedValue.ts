"use client";

import { useEffect, useState } from "react";

const DEFAULT_MS = 300;

/**
 * Returns a debounced version of the value. Updates after `delayMs` of no changes.
 * Production-ready: avoids excessive API calls on rapid typing.
 */
export function useDebouncedValue<T>(value: T, delayMs: number = DEFAULT_MS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
