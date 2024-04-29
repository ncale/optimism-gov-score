"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  WC_PROJECT_ID,
  OPTIMISM_RPC_URL,
  MAINNET_RPC_URL,
} from "@/config/config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, optimism } from "wagmi/chains";
import { http } from "@wagmi/core";
import { useRouter } from "next/navigation";

const config = getDefaultConfig({
  appName: "GovScore",
  projectId: WC_PROJECT_ID,
  chains: [optimism, mainnet],
  transports: {
    [mainnet.id]: http(MAINNET_RPC_URL),
    [optimism.id]: http(OPTIMISM_RPC_URL),
  },
  ssr: true,
});
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={optimism}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
