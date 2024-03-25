import { OP_TOKEN_ADDRESS } from '@/config/config'
import { opTokenAbi } from '@/config/op-token-abi'
import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, isAddress } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { calcGovScore } from '@/lib/utils'
import { getData } from '@/services/getData'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')

  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: 'Invalid address' })
  }

  const opClient = createPublicClient({
    chain: optimism,
    transport: http('https://optimism-rpc.publicnode.com'),
  })

  const mainnetClient = createPublicClient({
    chain: mainnet,
    transport: http('https://ethereum-rpc.publicnode.com'),
  })

  const delegateAddress = await opClient.readContract({
    address: OP_TOKEN_ADDRESS,
    abi: opTokenAbi,
    functionName: 'delegates',
    args: [address],
  })

  const delegateEnsName = await mainnetClient.getEnsName({
    address: delegateAddress,
  })

  // Only fetch avatar if ENS name is set
  const delegateEnsAvatar = delegateEnsName
    ? await mainnetClient.getEnsAvatar({ name: delegateEnsName })
    : undefined

  const allDelegateData = await getData(delegateAddress)

  const delegateData = allDelegateData?.find(
    (delegate) =>
      delegate.address.toLowerCase() === delegateAddress.toLowerCase()
  )

  const govScoreConfig = {
    isEnsNameSet: !!delegateEnsName,
    isEnsAvatarSet: !!delegateEnsAvatar,
    isFcAcctAttached: false, // dummy data, borrowed from message.tx
    recentParticipation: delegateData?.count_participation || 0,
    pctDelegation: delegateData?.pct_voting_power || 0,
  }

  const { scores } = calcGovScore(govScoreConfig)
  const govScore = Object.values(scores).reduce((a, b) => a + b, 0)

  return NextResponse.json({ scores, govScore })
}
