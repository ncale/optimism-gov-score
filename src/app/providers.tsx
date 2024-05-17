"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  WC_PROJECT_ID,
  OPTIMISM_RPC_URL,
  MAINNET_RPC_URL,
  NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST,
} from "@/config/config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, optimism } from "wagmi/chains";
import { http } from "@wagmi/core";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

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

if (typeof window !== "undefined") {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <CSPostHogProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider initialChain={optimism}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </CSPostHogProvider>
  );
}
