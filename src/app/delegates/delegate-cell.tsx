import { useEnsName, useEnsAvatar } from "wagmi";
import { normalize } from "viem/ens";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { CellContext } from "@tanstack/react-table";
import type { DelegateTableRow } from "@/app/delegates/columns";

export default function DelegateCell({ props }: { props: CellContext<DelegateTableRow, string> }) {
	const { data: ensName } = useEnsName({
		address: props.getValue().split(' - ')[0] as `0x${string}`,
		chainId: 1
	})
	const { data: ensAvatar } = useEnsAvatar({
		name: normalize(ensName?.toString() ?? ''),
		chainId: 1
	})
	const [addr, username] = props.getValue().split(' - ')
	const shortAddr = `${addr.slice(0, 5)}...${addr.slice(-4)}`
	return (
		<a href={`https://vote.optimism.io/delegates/${props.row.original.address}`} target="_blank">
			<div className="cell col-delegate flex">
				<Avatar>
					<AvatarImage src={ensAvatar ? String(ensAvatar) : "/def-avatar.jpg"} />
					<AvatarFallback>...</AvatarFallback>
				</Avatar>
				<div className="flex flex-col ml-2 items-start justify-center">
					<h3 className="">{ensName ? ensName : shortAddr}</h3>
					{(addr === username) ? (
						<></>
					) : (
						<p className="">a.k.a. {username}</p>
					)}
				</div>
			</div>
		</a>
	)
}