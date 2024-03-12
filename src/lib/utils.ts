import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBigNumber(num: number) {
	const formattedNum = new Intl.NumberFormat().format(num);
	return formattedNum
}

export function formatPercentValue(num: number) {
	const formattedNum = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(num);
	if (formattedNum === '0.00%') return '<0.01%'
	return formattedNum
}