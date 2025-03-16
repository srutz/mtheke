import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
  
export function formatNumber(n: number, decimalPlaces = 2) {
    return n.toString().padStart(decimalPlaces, '0')
}
