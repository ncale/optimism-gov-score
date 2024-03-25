import { DelegateTableRow } from '@/app/delegates/columns'
import { getDelegates } from './getDelegates'
import { Address } from 'viem'

export async function getData(delegateAddress?: Address | undefined) {
  const delegateData = await getDelegates(delegateAddress)

  if (delegateData) {
    const rows = delegateData.map((row) => {
      return {
        rank: row.rank,
        address: row.address,
        username: row.username,
        pfpLink: '', // temporary hard-coded value
        voting_power: row.voting_power,
        pct_voting_power: row.pct_voting_power,
        count_participation: row.count_participation,
        gov_score: 0, // temporary hard-coded value
        is_current_delegate: false, // temporary hard-coded value
      } as DelegateTableRow
    })
    return rows
  }
}
