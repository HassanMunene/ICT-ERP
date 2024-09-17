import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using `clsx` and `twMerge` for Tailwind CSS integration.
 *
 * @param {...string} inputs - Variable number of class names to combine.
 * @returns {string} The combined class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}