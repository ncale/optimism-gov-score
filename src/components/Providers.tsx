'use client'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const config = getDefaultConfig({
  appName: 'GovScore',
  projectId: 'YOUR_PROJECT_ID',
  chains: [optimism],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export function Providers({children}: { children: React.ReactNode }) {
  const router = useRouter();
	
	return (
    <WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<NextUIProvider navigate={router.push}>
						{children}
					</NextUIProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
  )
}