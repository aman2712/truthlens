import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // will produce "data:image/png;base64,..."
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1]; // remove the "data:image/png;base64," part
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};
