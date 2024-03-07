export interface Delegate {
	key: string
	is_current_delegate: boolean
	rank?: number
	delegate?: string
	pfpLink: string
	voting_power?: number
	percent_delegated_supply?: number
	percent_participation?: number
	gov_score?: number
	delegate_button?: boolean
}

export const rows: Delegate[] = [
  {
    key: "1",
    is_current_delegate: true,
    rank: 4,
    delegate: "ncale.eth",
		pfpLink: "https://i.imgur.com/Sfbunk9.jpg",
		voting_power: 100000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 9,
		delegate_button: true,
  },
	{
    key: "3",
    is_current_delegate: false,
    rank: 1,
    delegate: "limes.eth",
		pfpLink: "https://i.seadn.io/gae/CsglYc_NZ0lHvdIHH9dXUpiAjL21jXvajIOaqRep64H76yzjsGjVa3z3KcZtNBPoeyuBizJywkWddxQ8t8gQB2sOjPny2WGFj4LEfg?w=500&auto=format",
		voting_power: 100000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 6,
		delegate_button: true,
  },
	{
    key: "4",
    is_current_delegate: false,
    rank: 2,
    delegate: "ncale.eth",
		pfpLink: "",
		voting_power: 72000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 4,
		delegate_button: true,
  },
	{
    key: "5",
    is_current_delegate: false,
    rank: 3,
    delegate: "sheri.eth",
		pfpLink: "",
		voting_power: 5000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 1,
		delegate_button: true,
  },
	{
    key: "5",
    is_current_delegate: false,
    rank: 3,
    delegate: "sheri.eth",
		pfpLink: "",
		voting_power: 5000000,
		percent_delegated_supply: 0.79,
		percent_participation: 0.72,
		gov_score: 9,
		delegate_button: true,
  },
	{
    key: "5",
    is_current_delegate: false,
    rank: 3,
    delegate: "sheri.eth",
		pfpLink: "",
		voting_power: 5000000,
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
		hideHeader: true,
  },
  {
    key: "rank",
    label: "Rank",
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
		label: null,
		hideHeader: true,
	}
];