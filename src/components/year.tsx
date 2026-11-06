"use client";

import { useCurrentYear } from "@/lib/hooks";

export function Year() {
  return <span>{useCurrentYear() ?? ""}</span>;
}
