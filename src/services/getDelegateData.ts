import { PONDER_API_URL } from "@/config/config";
import { Address } from "viem";

async function queryGqlApi<T>(query: string): Promise<T> {
  console.log("Running queryGqlApi...");

  const res = await fetch(PONDER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate: 3600 * 24,
    },
  });
  return (await res.json()) as T;
}

export async function findOneDelegate(
  address: Address
): Promise<DelegateQueryResponse> {
  console.log("Running findOneDelegate...");

  const params = `(where: {address: "${address}"}, limit: 1)`;
  const query = `
	query MyQuery {
		delegates${params} {
			items {
				address
				ensName
				ensAvatar
				votingPower
				votes {
					items {
						proposalId
						blockNum
					}
				}				
			}
		}
	}
	`;
  return await queryGqlApi<DelegateQueryResponse>(query);
}

export async function getDelegates(): Promise<DelegateQueryResponse> {
  console.log("Running getDelegates...");

  const params = `(orderBy: "votingPower", orderDirection: "desc")`;
  const query = `
	query MyQuery {
		delegates${params} {
			items {
				address
				ensName
				ensAvatar
				votingPower
				votes {
					items {
						proposalId
						blockNum
					}
				}				
			}
		}
	}
	`;
  return await queryGqlApi<DelegateQueryResponse>(query);
}

// TEMPORARY - get function that is passed a gql cursor for pagination
async function getDelegatePage(
  pageCursor?: string
): Promise<DelegateQueryResponse> {
  console.log("Running getDelegatePage...");

  const cursorParam = pageCursor ? `, after: "${pageCursor}"` : "";
  const params = `(orderBy: "votingPower", orderDirection: "desc"${cursorParam})`;
  const query = `
	query MyQuery {
		delegates${params} {
			items {
				address
				ensName
				ensAvatar
				votingPower
				votes {
					items {
						proposalId
						blockNum
						withReason
					}
				}				
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
	`;
  return await queryGqlApi<DelegateQueryResponse>(query);
}
// TEMPORARY - paginates through entire delegate list
export async function getAllDelegates() {
  const allDelegates: Delegate[] = [];
  let response = await getDelegatePage();
  if (!response.data)
    throw new Error("No data available. Check data sources and queries.");
  let delegates = response.data.delegates.items;
  let delegatePageInfo = response.data.delegates.pageInfo;
  // return delegatePage.data ? delegatePage.data.delegates.items : [];
  allDelegates.push(...delegates);
  let loopCount = 0;
  while (loopCount < 9) {
    // (delegatePageInfo.hasNextPage ?? false) || loopCount === 3) {
    response = await getDelegatePage(delegatePageInfo.endCursor);
    delegates = response.data ? response.data.delegates.items : [];
    delegatePageInfo = response.data.delegates.pageInfo;
    allDelegates.push(...delegates);
    loopCount++;
  }
  return allDelegates;
}

export type DelegateQueryResponse = {
  data: {
    delegates: {
      items: Delegate[];
      pageInfo: {
        endCursor: string;
        startCursor: string;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
      };
    };
  };
};
type Delegate = {
  id?: string;
  address: Address;
  ensName: string | null;
  ensAvatar: string | null;
  votingPower: string;
  votes: {
    items: Vote[];
  };
};
type Vote = {
  id?: string;
  proposalId: string;
  blockNum: string;
  delegateId?: string;
  withReason: boolean;
};
