import { Address, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export async function getEnsData(address: Address | null): Promise<EnsData> {
  if (!address)
    throw new Error("Address provided to getEnsData of type `null`");
  const mainnetClient = createPublicClient({
    chain: mainnet,
    transport: http("https://ethereum-rpc.publicnode.com"),
  });
  const ensName = await mainnetClient.getEnsName({ address });
  // Only fetch avatar if ENS name is set
  const ensAvatar = ensName
    ? await mainnetClient.getEnsAvatar({ name: ensName })
    : null;
  return { ensName, ensAvatar };
}
export type EnsData = {
  ensName: string | null;
  ensAvatar: string | null;
};
