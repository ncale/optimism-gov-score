"use client";

// Components
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@nextui-org/react";
import DelegateButton from "./delegate-button";
import { ScoreCard } from "./card-components";
// Hooks
import { useMediaQuery } from "@/hooks/use-media-query";
// Helper functions
import { formatBigNumber, formatPercentValue, Scores } from "@/lib/utils";
// Types
import type { Column, Row } from "@tanstack/react-table";
import { type PropsWithChildren } from "react";
// Icons
import {
  SortArrowsIcon,
  SortUpIcon,
  SortDownIcon,
  LinkIcon,
} from "@/components/icons/lucide-icons";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Address } from "viem";

const columnHelper = createColumnHelper<DelegateTableRow>();

export const columns = [
  columnHelper.accessor("rank", {
    header: ({ column }) => {
      return (
        <SortButton column={column}>
          <div>Rank</div>
        </SortButton>
      );
    },
  }),
  columnHelper.accessor("delegate", {
    header: "Delegate",
    cell: ({ row }) => <DelegateCell row={row} />,
  }),
  columnHelper.accessor("gov_score", {
    header: ({ column }) => {
      return (
        <SortButton column={column}>
          <div>GovScore</div>
        </SortButton>
      );
    },
    cell: ({ row }) => <GovScoreCell row={row} />,
  }),
  columnHelper.accessor("voting_power", {
    header: ({ column }) => {
      return (
        <SortButton column={column}>
          <div>Voting Power</div>
        </SortButton>
      );
    },
    cell: ({ row }) => {
      const num = formatBigNumber(row.getValue("voting_power"));
      return `${num} OP`;
    },
  }),
  columnHelper.accessor("pct_voting_power", {
    header: ({ column }) => {
      return (
        <SortButton column={column}>
          <div>% of Voting Power</div>
        </SortButton>
      );
    },
    cell: ({ row }) => {
      const num = formatPercentValue(row.getValue("pct_voting_power"));
      return <div>{num}</div>;
    },
  }),
  columnHelper.accessor("recent_participation", {
    header: ({ column }) => {
      return (
        <SortButton column={column}>
          <div>Recent Participation</div>
        </SortButton>
      );
    },
    cell: ({ row }) => `${row.getValue("recent_participation")}/10 votes`,
  }),
  columnHelper.display({
    id: "delegateButton",
    cell: ({ row }) => (
      <DelegateButton newDelegateAddress={row.original.metadata__address} />
    ),
  }),
] as ColumnDef<DelegateTableRow>[];

export type DelegateTableRow = {
  rank: number;
  delegate: `${Address} - ${string}.eth`; // id included as a concatenated string to allow easier search filtering
  metadata__address: Address;
  metadata__ens_name: `${string}.eth` | null;
  metadata__ens_avatar: string | null;
  gov_score: number;
  metadata__scores: Scores;
  voting_power: number;
  pct_voting_power: number;
  recent_participation: number;
};

function SortButton({
  children,
  column,
}: PropsWithChildren<{
  column: Column<DelegateTableRow>;
}>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting()}
      className="space-x-1"
    >
      {children}
      {column.getIsSorted() ? null : <SortArrowsIcon />}
      {{
        asc: <SortUpIcon />,
        desc: <SortDownIcon />,
      }[column.getIsSorted() as string] ?? null}
    </Button>
  );
}

function DelegateCell({ row }: { row: Row<DelegateTableRow> }) {
  const address = row.original.metadata__address;
  const ensName = row.original.metadata__ens_name;
  const ensAvatar = row.original.metadata__ens_avatar;

  const abbreviatedAddress = `${address.slice(0, 5)}...${address.slice(-4)}`;

  return (
    <a href={`https://vote.optimism.io/delegates/${address}`} target="_blank">
      <div className="w-56 flex items-center hover:scale-105 origin-left ease-in-out duration-75">
        <Avatar>
          {ensAvatar ? <AvatarImage src={ensAvatar} /> : null}
          <AvatarFallback className="bg-ens-grad" />
        </Avatar>
        <div className="flex flex-col ml-2 mr-1 items-start justify-center">
          <h3 className="">{ensName ? ensName : abbreviatedAddress}</h3>
        </div>
        <LinkIcon />
      </div>
    </a>
  );
}

function InfoTooltipContent() {
  return (
    <div>
      <div className="leading-tight w-64 md:w-72">
        <p className="mb-1">
          An opinionated score of how worthy a delegate is of receiving further
          delegation.
        </p>
        <p className="mb-1">
          A high govscore means a delegate{" "}
          <span className="special">votes consistently</span>, has a{" "}
          <span className="special">transparent onchain identity</span>, and is
          not <span className="special">too powerful</span>.{" "}
        </p>
        <p className="mt-2">Ex...</p>
        <div className="bg-secondary w-fit h-fit px-2 py-1 rounded-md mb-2 shadow-lg">
          <ScoreCard
            scores={{
              ensName: 1,
              ensAvatar: 0,
              recentParticipation: 4.5,
              pctDelegation: 3,
            }}
          />
        </div>
        <Link href="/faq" className="special link">
          read more
        </Link>
      </div>
    </div>
  );
}

function GovScoreCell({ row }: { row: Row<DelegateTableRow> }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const govScore = row.original.gov_score;
  const scores = row.original.metadata__scores;
  return (
    <div>
      {isDesktop ? (
        <Tooltip placement="right" content={<ScoreCard scores={scores} />}>
          <div className="cursor-pointer w-16 mx-auto py-0.5 bg-blue-600 rounded-md text-primary-foreground font-bold hover:bg-blue-500 ease-in-out duration-75">{`${govScore}/10`}</div>
        </Tooltip>
      ) : (
        <Popover>
          <PopoverTrigger className="bg-blue-600 text-primary-foreground font-bold py-0.5 px-1 rounded-md">{`${govScore}/10`}</PopoverTrigger>
          <PopoverContent>
            <ScoreCard scores={scores} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
