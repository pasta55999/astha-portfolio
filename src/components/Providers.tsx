"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honour prefers-reduced-motion for every framer-motion animation site-wide. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
