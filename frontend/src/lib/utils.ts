import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//kiem tra ngay thang hop le
export function isValidDateDMY(dateStr: string) {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

// Helper to extract dayNum & dayAbbr from date string
export const parseDateInfo = (dateStr: string) => {
  const parts = dateStr.split(', ')[1]?.split(' ');
  if (!parts) return { dayNum: '', dayAbbr: '' };
  return { dayNum: parts[1], dayAbbr: dateStr.split(',')[0] };
}

export const formatDate = (dateStr: String) => {
  const parts = dateStr.split('/');
  if(!parts) return {month:'', day:''};
  return{month: parts[0], day: parts[1]}; 
}
