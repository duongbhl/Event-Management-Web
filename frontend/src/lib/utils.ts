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



//tach date ra month day year
export const formatDate = (dateStr: String) => {
  const parts = dateStr.split('/');
  if(!parts) return {month:'', day:'', year:''};
  return{month: parts[0], day: parts[1], year: parts[2]}; 
}


// xu li filter upcoming, this day, this week cua su kien
export const isWithinRange = (eventDate: Date, filter: string) => {
    const now = new Date();
    const d = eventDate;

    switch (filter) {
        case 'Today':
            return d.toDateString() === now.toDateString();

        case 'Tomorrow': {
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            return d.toDateString() === tomorrow.toDateString();
        }

        case 'This Week': {
            const weekEnd = new Date();
            weekEnd.setDate(now.getDate() + 7);
            return d >= now && d <= weekEnd;
        }

        case 'This Month':
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

        default: // "Upcoming"
            return d >= now;
    }
};
