import { GovScoreConfig } from "@/types/utilsTypes";
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

export function calcGovScore({ isEnsNameSet, isEnsAvatarSet, isFcAcctAttached, recentParticipation, pctDelegation }: GovScoreConfig) {
	// init scores variable
	let scores: {
		ensName: number // out of 1
		ensAvatar: number // out of 0.5 (temporarily out of 1)
		fcAcct: number // out of 0.5 (temporarily out of 0)
		recentParticipation: number // out of 5
		pctDelegation: number // out of 3
	} = {ensName: 0, ensAvatar: 0, fcAcct: 0, recentParticipation: 0, pctDelegation: 0}
	// add transparency criteria
	if (isEnsNameSet) scores.ensName++
	if (isEnsAvatarSet) scores.ensAvatar += 1 // 0.5 (temp out of 1)
	if (isFcAcctAttached) scores.fcAcct += 0 // 0.5 (temp out of 0)
	// add consistency criteria
	scores.recentParticipation += (recentParticipation * 0.5)
	// add power balance criteria
	if (pctDelegation < 0.005) {
		scores.pctDelegation += 3
	} else if (pctDelegation < 0.01) {
		scores.pctDelegation += 2
	} else if (pctDelegation < 0.015) {
		scores.pctDelegation += 1
	}
	return { scores }
}