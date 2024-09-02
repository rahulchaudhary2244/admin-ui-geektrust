import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const range = (length: number) =>
    Array.from({ length }, (_, i) => i + 1);

export const URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
