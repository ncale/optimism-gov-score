import {
  IconCheck,
  IconMinus,
  IconXMark,
} from "@/components/icons/lucide-icons";
import { type Scores } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { type DelegateTableRow } from "./columns";

export function DelegateCard({ delegate }: { delegate: DelegateTableRow }) {
  const address = delegate.metadata__address;
  const ensName = delegate.metadata__ens_name;
  const ensAvatar = delegate.metadata__ens_avatar;
  const scores = delegate.metadata__scores;
  const govScore = delegate.gov_score;

  const nameText = ensName
    ? ensName
    : `${address.slice(0, 5)}...${address.slice(-4)}`;

  return (
    <div className="items-left flex w-full flex-col gap-1.5">
      <div>Your delegate is...</div>
      <a
        href={`https://vote.optimism.io/delegates/${address}`}
        target="_blank"
        className="flex items-center text-lg font-bold md:text-2xl"
      >
        <Avatar className="h-14 w-14">
          {ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
          <AvatarFallback className="bg-ens-grad" />
        </Avatar>
        <div className="ml-2">
          <h3 className="">{nameText}</h3>
        </div>
      </a>
      <hr />
      <ScoreCard scores={scores} />
      <hr />
      <p className="text-xl font-bold">{govScore}/10 GovScore</p>
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

export function ScoreCard({ scores }: { scores: Scores }) {
  const ensScore = scores.ensName + scores.ensAvatar;
  return (
    <div className="text-sm">
      {/* Recent Voting Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {scores.recentParticipation > 2.8 ? (
          <IconCheck />
        ) : scores.recentParticipation > 1.2 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${scores.recentParticipation}/4`} />
        <span>
          Voted in{" "}
          <span className="special">
            {Math.round(scores.recentParticipation / 0.4)}
          </span>{" "}
          of last <span className="special">10</span> onchain props
        </span>
      </div>

      {/* Voting Power Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {scores.pctDelegation === 3 ? (
          <IconCheck />
        ) : scores.pctDelegation > 0 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${scores.pctDelegation}/3`} />
        <span>
          {getPctDelegationText(scores.pctDelegation)} of total delegated OP
        </span>
      </div>

      {/* Ens Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {ensScore === 2 ? (
          <IconCheck />
        ) : ensScore === 1 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${ensScore}/2`} />
        <span>
          {ensScore === 2
            ? "ENS primary name and avatar set"
            : ensScore === 1
              ? "ENS primary name set, no avatar"
              : "No ENS primary name or avatar set"}
        </span>
      </div>

      {/* Recent Voting With Reason Score */}
      <div className="flex items-center gap-1 overflow-hidden [&>*]:shrink-0">
        {scores.recentParticipationWithReason > 0.7 ? (
          <IconCheck />
        ) : scores.recentParticipationWithReason > 0.3 ? (
          <IconMinus />
        ) : (
          <IconXMark />
        )}
        <ScorePill score={`${scores.recentParticipationWithReason}/1`} />
        <span>
          Voted with reason in{" "}
          <span className="special">
            {Math.round(scores.recentParticipationWithReason / 0.1)}
          </span>{" "}
          of last <span className="special">10</span> props
        </span>
      </div>
    </div>
  );
}

function getPctDelegationText(score: number) {
  switch (score) {
    case 0:
      return "More than 1.5%";
    case 1:
      return "More than 1.0%";
    case 2:
      return "More than 0.5%";
    case 3:
      return "Less than 0.5%";
  }
}

export function ScorePill({ score }: { score: string | number }) {
  return (
    <div className="h-[1.3em] w-9 rounded-full bg-gray-600 text-center text-xs font-bold text-white">
      {score}
    </div>
  );
}
