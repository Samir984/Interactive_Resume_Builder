import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{9}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateDateRange = (
  startDate: string,
  endDate: string,
  current: boolean
): boolean => {
  if (current) return true;
  if (!startDate || !endDate) return false;
  return new Date(startDate) <= new Date(endDate);
};

