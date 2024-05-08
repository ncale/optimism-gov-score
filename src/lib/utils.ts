import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBigNumber(num: number) {
  const int = Math.round(num);
  const formattedNum = new Intl.NumberFormat("en-US").format(int);
  const valList = formattedNum.split(",");
  if (valList.length === 1) {
    return valList[0];
  } else if (valList.length === 2) {
    return `${valList[0]}.${valList[1].slice(0, 2)}k`;
  } else if (valList.length === 3) {
    return `${valList[0]}.${valList[1].slice(0, 2)}M`;
  }
  return "error";
}

export function formatPercentValue(num: number) {
  const formattedNum = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(num);
  if (formattedNum === "0.00%") return "<0.01%";
  return formattedNum;
}

export function calculateQualityFactor({
  isEnsNameSet,
  isEnsAvatarSet,
  recentParticipation,
  recentParticipationWithReason,
}: QualityFactorConfig): QualityFactorResult {
  // init scores variable
  const scores: QualityFactorScores = {
    recentParticipation: 0,
    ensName: 0,
    ensAvatar: 0,
    recentParticipationWithReason: 0,
  };
  // add consistency criteria
  scores.recentParticipation = recentParticipation * 60;
  // add transparency criteria
  if (isEnsNameSet) scores.ensName = 100;
  if (isEnsAvatarSet) scores.ensAvatar = 100;
  // add voting with reason criteria
  scores.recentParticipationWithReason = recentParticipationWithReason * 20;
  // sum and return
  const govScore = Object.values(scores).reduce((a, b) => a + b, 0);
  return { details: scores, value: govScore };
}
export type QualityFactorConfig = {
  isEnsNameSet: boolean;
  isEnsAvatarSet: boolean;
  recentParticipation: number;
  recentParticipationWithReason: number;
};
export type QualityFactorResult = {
  value: number;
  details: QualityFactorScores;
};
export type QualityFactorScores = {
  recentParticipation: number;
  ensName: number;
  ensAvatar: number;
  recentParticipationWithReason: number;
};

export function calculatePowerFactor({
  pct_voting_power,
}: PowerFactorConfig): PowerFactorResult {
  const maxScore = 1000;
  const decayFactor = 1;
  // Calculate score
  const score = maxScore * Math.exp(-decayFactor * pct_voting_power * 100);
  // Clamp score to allowed range and round
  const formattedScore = Math.round(Math.min(Math.max(score, 0), maxScore));
  return { value: formattedScore };
}
export type PowerFactorConfig = { pct_voting_power: number };
export type PowerFactorResult = {
  value: number;
  details?: {};
};

export function calculateGovScore({
  qualityFactor,
  powerFactor,
}: GovScoreConfig): GovScoreResult {
  const result = Math.floor(qualityFactor * 0.7 + powerFactor * 0.3);
  return { value: result };
}
export type GovScoreConfig = {
  qualityFactor: number;
  powerFactor: number;
};
export type GovScoreResult = { value: number };
