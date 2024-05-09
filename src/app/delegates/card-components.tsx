import {
  IconCheck,
  IconMinus,
  IconXMark,
} from "@/components/icons/lucide-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { type DelegateTableRow } from "./columns";
import {
  type PowerFactorDetails,
  type ActivityFactorScores,
} from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function DelegateCard({ delegate }: { delegate: DelegateTableRow }) {
  const address = delegate.metadata__address;
  const ensName = delegate.metadata__ens_name;
  const ensAvatar = delegate.metadata__ens_avatar;
  const govScore = delegate.gov_score;

  const nameText = ensName
    ? ensName
    : `${address.slice(0, 5)}...${address.slice(-4)}`;

  return (
    <div className="w-full space-y-1.5">
      <div>Your delegate is...</div>
      <div className="flex items-center justify-between">
        <a
          href={`https://vote.optimism.io/delegates/${address}`}
          target="_blank"
          className="flex items-center space-x-2 text-lg font-bold md:text-2xl"
        >
          <Avatar className="h-14 w-14">
            {ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
            <AvatarFallback className="bg-ens-grad" />
          </Avatar>
          <div>
            <h3>{nameText}</h3>
          </div>
          <ExternalLink size={16} strokeWidth={2.5} />
        </a>
        <p className="text-xl font-bold">{govScore} GovScore</p>
      </div>
    </div>
  );
}

export function OPBalanceCard({ balance }: { balance: string | number }) {
  const roundedNum = Math.round(Number(balance));
  return (
    <div className="w-full">
      <span>
        You have <span className="font-bold">{roundedNum} OP</span>
      </span>
    </div>
  );
}

export function ActivityFactorScoreCard({
  activityFactor,
  scores,
}: {
  activityFactor: number;
  scores: ActivityFactorScores;
}) {
  const ensScore = scores.ensName + scores.ensAvatar;
  const votes = scores.recentParticipation / 60;
  const votesWithReason = scores.recentParticipationWithReason / 20;
  return (
    <div className="space-y-1 text-sm">
      {/* Summary & Formula */}
      <div className="flex items-center space-x-1">
        {activityFactor > 700 ? (
          <IconCheck />
        ) : activityFactor > 300 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={activityFactor} />
        <pre className="text-xs">
          {"= 60("}
          <span className="text-blue-600 underline">{votes}</span>
          {") + 100("}
          <span className="text-blue-600 underline">
            {scores.ensName ? 1 : 0}
          </span>
          {") + 100("}
          <span className="text-blue-600 underline">
            {scores.ensAvatar ? 1 : 0}
          </span>
          {") + 20("}
          <span className="text-blue-600 underline">{votesWithReason}</span>
          {")"}
        </pre>
      </div>

      {/* Divider */}
      <hr />

      {/* Scores */}
      <div>
        {/* Recent Votes */}
        <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
          {scores.recentParticipation > 420 ? (
            <IconCheck />
          ) : scores.recentParticipation > 180 ? (
            <IconMinus />
          ) : (
            <IconXMark />
          )}
          <ScorePill score={`${scores.recentParticipation}/600`} />
          <span>
            Voted in <span className="special">{votes}</span> of last{" "}
            <span className="special">10</span> onchain props
          </span>
        </div>

        {/* ENS */}
        <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
          {ensScore === 200 ? (
            <IconCheck />
          ) : ensScore === 100 ? (
            <IconMinus />
          ) : (
            <IconXMark />
          )}
          <ScorePill score={`${ensScore}/200`} />
          <span>
            {ensScore === 200
              ? "ENS primary name and avatar set"
              : ensScore === 100
                ? "ENS primary name set, no avatar"
                : "No ENS primary name or avatar set"}
          </span>
        </div>

        {/* Recent Voting With Reason */}
        <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
          {scores.recentParticipationWithReason > 140 ? (
            <IconCheck />
          ) : scores.recentParticipationWithReason > 60 ? (
            <IconMinus />
          ) : (
            <IconXMark />
          )}
          <ScorePill score={`${scores.recentParticipationWithReason}/200`} />
          <span>
            Voted with reason in{" "}
            <span className="special">{votesWithReason}</span> of last{" "}
            <span className="special">10</span> props
          </span>
        </div>
      </div>
    </div>
  );
}

export function PowerFactorScoreCard({
  powerFactor,
  powerFactorDetails,
}: {
  powerFactor: number;
  powerFactorDetails: PowerFactorDetails;
}) {
  const pctVotingPower = powerFactorDetails.pctVotingPower;
  const roundedPctVotingPower = Math.round(pctVotingPower * 1000) / 1000;
  return (
    <div className="w-52 space-y-1 text-sm">
      {/* Summary & Formula */}
      <div className="flex items-center space-x-1">
        {powerFactor > 700 ? (
          <IconCheck />
        ) : powerFactor > 300 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={powerFactor} />
        <pre className="pl-0.5 text-xs">
          {"= 1000*(e^"}
          <span className="text-blue-600 underline">
            -{roundedPctVotingPower}
          </span>
          {")"}
        </pre>
      </div>

      {/* Divider */}
      <hr />

      {/* Description */}
      <div className="leading-tight">
        {
          "Function related to a delegate's voting power %. For more info, see the "
        }
        <Link
          href={"/faq"}
          className="font-medium text-blue-500 underline hover:text-blue-400 active:text-blue-600"
        >
          FAQ
        </Link>
        .
      </div>
    </div>
  );
}

export function GovScoreScoreCard({
  activityFactor,
  powerFactor,
  govScore,
}: {
  activityFactor: number;
  powerFactor: number;
  govScore: number;
}) {
  const af_pct = activityFactor / 10;
  const pf_pct = powerFactor / 10;
  return (
    <div className="w-52 space-y-1 text-sm">
      {/* Summary & Formula */}
      <div className="flex space-x-1">
        {govScore > 700 ? (
          <IconCheck />
        ) : govScore > 300 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={govScore} />
        <pre className="text-xs">
          {"= 0.7("}
          <span className="text-blue-600 underline">{activityFactor}</span>
          {") + 0.3("}
          <span className="text-blue-600 underline">{powerFactor}</span>
          {")"}
        </pre>
      </div>

      {/* Divider */}
      <hr />

      {/* Score Breakdown */}
      <div className="grid grid-cols-10">
        {/* Labels */}
        <p className="col-span-7 text-center font-medium underline">Activity</p>
        <p className="col-span-3 text-center font-medium underline">Power</p>
        {/* Scores */}
        <p className="col-span-7 bg-blue-50 text-center">{activityFactor}</p>
        <p className="col-span-3 bg-purple-50 text-center">{powerFactor}</p>
        {/* Bars */}
        <div className="col-span-7 h-2 bg-blue-200">
          <div className="h-full bg-blue-500" style={{ width: `${af_pct}%` }} />
        </div>
        <div className="col-span-3 h-2 bg-purple-200">
          <div
            className="h-full bg-purple-500"
            style={{ width: `${pf_pct}%` }}
          />
        </div>
      </div>

      {/* Divider */}
      <hr />

      {/* Description */}
      <div>
        GovScore is a 70/30 weighed average between Activity and Power Factor
        respectively. For more info, see the{" "}
        <Link
          href={"/faq"}
          className="font-medium text-blue-500 underline hover:text-blue-400 active:text-blue-600"
        >
          FAQ
        </Link>
        .
      </div>
    </div>
  );
}

export function ScorePill({ score }: { score: string | number }) {
  return (
    <div className="h-[1.3em] w-fit rounded-full bg-gray-600 px-1 text-center text-xs font-bold text-white">
      {score}
    </div>
  );
}
