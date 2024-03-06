export interface Delegate {
	key: string
	is_current_delegate: boolean
	rank: number
	delegate: string
	voting_power: number
	percent_delegated_supply: number
	percent_participation: number
	gov_score: number
	delegate_button: boolean
}

export const rows: Delegate[] = [
  {
    key: "1",
    is_current_delegate: false,
    rank: 1,
    delegate: "limes.eth",
		voting_power: 100000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 9,
		delegate_button: true,
  },
	{
    key: "2",
    is_current_delegate: false,
    rank: 2,
    delegate: "ncale.eth",
		voting_power: 72000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 9,
		delegate_button: true,
  },
	{
    key: "3",
    is_current_delegate: false,
    rank: 3,
    delegate: "sheri.eth",
		voting_power: 5000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 9,
		delegate_button: true,
  },
	{
    key: "4",
    is_current_delegate: false,
    rank: 4,
    delegate: "limes.eth",
		voting_power: 2000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 9,
		delegate_button: true,
  },
];

export const columns = [
  {
    key: "is_current_delegate",
    label: null,
  },
  {
    key: "rank",
    label: null,
  },
  {
    key: "delegate",
    label: "Delegate",
  },
	{
    key: "voting_power",
    label: "Voting Power",
  },
	{
    key: "percent_delegated_supply",
    label: "% of Delegated Supply",
  },
	{
    key: "percent_participation",
    label: "% Participation",
  },
	{
    key: "gov_score",
    label: "GovScore",
  },
	{
		key: "delegate_button",
		label: null
	}
];