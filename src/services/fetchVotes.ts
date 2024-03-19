import { PONDER_API_URL } from "@/config/config";

export async function fetchVotes(endCursor: string = '') {
	const query = `
	query MyQuery {
		delegates${endCursor ? `(after: "${endCursor}")` : ''} {
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
	const data = await fetch(new URL(PONDER_API_URL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query })
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