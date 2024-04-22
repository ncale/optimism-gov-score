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

export function calcGovScore({
  isEnsNameSet,
  isEnsAvatarSet,
  recentParticipation,
  recentParticipationWithReason,
  pctDelegation,
}: GovScoreConfig): GovScore {
  // init scores variable
  const scores: Scores = {
    ensName: 0,
    ensAvatar: 0,
    recentParticipation: 0,
    recentParticipationWithReason: 0,
    pctDelegation: 0,
  };
  // add transparency criteria
  if (isEnsNameSet) scores.ensName = 1;
  if (isEnsAvatarSet) scores.ensAvatar = 1;
  // add consistency criteria
  scores.recentParticipation = recentParticipation * 0.4;
  // add voting with reason criteria
  scores.recentParticipationWithReason = recentParticipationWithReason * 0.1;
  // add power balance criteria
  if (pctDelegation < 0.005) {
    scores.pctDelegation = 3;
  } else if (pctDelegation < 0.01) {
    scores.pctDelegation = 2;
  } else if (pctDelegation < 0.015) {
    scores.pctDelegation = 1;
  }
  const govScore = Object.values(scores).reduce((a, b) => a + b, 0);
  return { scores, govScore };
}
export type GovScoreConfig = {
  isEnsNameSet: boolean;
  isEnsAvatarSet: boolean;
  recentParticipation: number;
  recentParticipationWithReason: number;
  pctDelegation: number;
};
export type GovScore = {
  scores: Scores;
  govScore: number;
};
export type Scores = {
  ensName: number;
  ensAvatar: number;
  recentParticipation: number;
  recentParticipationWithReason: number;
  pctDelegation: number;
};
