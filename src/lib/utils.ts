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
  recentParticipation,
  isEnsNameSet,
  isEnsAvatarSet,
  recentParticipationWithReason,
}: GovScoreConfig): GovScore {
  // init scores variable
  const scores: Scores = {
    recentParticipation: 0,
    ensName: 0,
    ensAvatar: 0,
    recentParticipationWithReason: 0,
  };
  // add consistency criteria
  const recentParticipationScore = recentParticipation * 0.6;
  scores.recentParticipation = Math.round(recentParticipationScore * 10) / 10;
  // add transparency criteria
  if (isEnsNameSet) scores.ensName = 1;
  if (isEnsAvatarSet) scores.ensAvatar = 1;
  // add voting with reason criteria
  const recentParticipationWithReasonScore =
    recentParticipationWithReason * 0.2;
  scores.recentParticipationWithReason =
    Math.round(recentParticipationWithReasonScore * 10) / 10;
  // sum and return
  const govScore = Object.values(scores).reduce((a, b) => a + b, 0);
  return { scores, govScore };
}
export type GovScoreConfig = {
  recentParticipation: number;
  isEnsNameSet: boolean;
  isEnsAvatarSet: boolean;
  recentParticipationWithReason: number;
};
export type GovScore = {
  scores: Scores;
  govScore: number;
};
export type Scores = {
  recentParticipation: number;
  ensName: number;
  ensAvatar: number;
  recentParticipationWithReason: number;
};
