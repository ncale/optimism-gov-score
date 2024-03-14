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

export function calcGovScore(
	isEnsNameSet: boolean, 
	isEnsAvatarSet: boolean, 
	isFcAcctAttached: boolean,
	recentParticipationRatio: number,
	pctDelegation: number,
) {
	let govScore = 0
	// add transparency criteria
	if (isEnsNameSet) govScore++
	if (isEnsAvatarSet) govScore += 0.5
	if (isFcAcctAttached) govScore += 0.5
	// add consistency criteria
	govScore += (recentParticipationRatio * 0.5)
	// add power balance criteria
	if (pctDelegation < 0.005) {
		govScore += 3
	} else if (pctDelegation < 0.01) {
		govScore += 2
	} else if (pctDelegation < 0.015) {
		govScore += 1
	}
	return govScore
}