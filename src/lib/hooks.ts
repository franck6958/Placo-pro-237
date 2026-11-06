"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Année courante côté client (null pendant le rendu serveur). */
export function useCurrentYear(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
}
