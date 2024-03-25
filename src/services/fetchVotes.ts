import { PONDER_API_URL } from '@/config/config'
import { Address } from 'viem'

export async function getAllVotes(address?: Address | undefined) {
  const allVotes = []
  let votesPage = await fetchVotes({ delegate: address })
  allVotes.push(...votesPage.items)
  while (votesPage.pageInfo.hasNextPage ?? false) {
    votesPage = await fetchVotes({ endCursor: votesPage.pageInfo.endCursor })
    allVotes.push(...votesPage.items)
  }

  return allVotes
}

async function fetchVotes({
  endCursor,
  delegate,
}: {
  endCursor?: string
  delegate?: Address
}) {
  const hasFilters = !!delegate || !!endCursor

  const query = `
	query MyQuery {
		delegates ${
      hasFilters
        ? `(
			${delegate ? `where: { address: "${delegate}" }` : ''}
			${endCursor ? `after: "${endCursor}"` : ''}
		)`
        : ''
    } {
			items {
				votes {
					items {
						proposalId
						blockNum
					}
				}
				address
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
	`
  const data = await fetch(PONDER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const res = (await data.json()) as QueryResponse

  return res.data.delegates
}

// Response types
interface QueryResponse {
  data: {
    delegates: {
      items: Delegate[]
      pageInfo: {
        hasNextPage: boolean
        endCursor: string
      }
    }
  }
}
interface Delegate {
  address: `0x${string}`
  votes: {
    items: Vote[]
  }
}
interface Vote {
  proposalId: string
  blockNum: string
}
