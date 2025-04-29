import { IDao, INft, IProposal, IVotingType, Social } from 'shared/types';

export const LOGO_URL =
	'https://s3-alpha-sig.figma.com/img/42ae/6ec1/60426ed7c2345cb0f3fa82362c4448c6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FP2xA~duxcKvBndxlZshuwejmfv2HCx870FkWLQEFtLghUqURStu727g9JfMKmssLHH9zgeuPBXuJR5Ezg6a7EC1tFMuJToC3Orumoi9BJwOSbA7YPhmevC4-knkwzFpeybPEAq9yIFuyr78og6X6NP5XA~z7Ci-EAiYDWyL32rlP8JojRL8PvVl5g03KJQhp0TU5tAlT-Mw-73jLVeAK3DMVMghFpqBcPS73Ewf6OcMSCxRQgSPV266ShogW4wP1u3u-0DnOaRISt75RhILpD~eO32EYUQ4dwI2RwsTAd7OBJiYI7P8RHsinn1FgxNmUPT86RkWmAahPOelmqJHGA__';

export const ProposalTypes = [
	{ id: 1, name: 'Add General Partner' },
	{ id: 2, name: 'Remove General Partner' },
	{ id: 3, name: 'Transfer GP Tokens' },
	{ id: 4, name: 'Change GP Transfer Status' },
	{ id: 5, name: 'Change General Consensus' },
	{ id: 6, name: 'Send DAO Funds' },
	{ id: 7, name: 'Change DAO Name' },
	{ id: 8, name: 'Custom proposal' },
];

export const DAOS_MOCK: IDao[] = [
	{
		id: '1',
		logo: LOGO_URL,
		name: 'Example DAO 1',
		activeProposals: 2,
		LPTokens: 500,
		email: 'email@mail.com',
		description: 'Some description',
		consensus: 51,
		social: [
			{ type: Social.Telegram, url: 'http://t.me/' },
			{ type: Social.Youtube, url: 'http://youtube.com/' },
		],
		distributionRules: [
			{ walletAddress: '43fjYR48JEfkfof83436437DJfewlr8', tokens: 100, percent: 30 },
			{ walletAddress: '4343878ffr3ufjrn8rfufHJR48fufj33f', tokens: 100, percent: 30 },
		],
		slots: {
			reserved: 2,
			total: 5,
		},
	},
	{
		id: '2',
		logo: LOGO_URL,
		name: 'Example DAO 2',
		activeProposals: 1,
		consensus: 43,
		LPTokens: 300,
		email: 'xdao@mail.com',
		social: [
			{ type: Social.Telegram, url: 'http://t.me/' },
			{ type: Social.Youtube, url: 'http://youtube.com/' },
		],
		distributionRules: [
			{ walletAddress: '43fjYR48JEfkfof83436437DJfewlr8', tokens: 100, percent: 30 },
			{ walletAddress: '4343878ffr3ufjrn8rfufHJR48fufj33f', tokens: 100, percent: 30 },
		],
		slots: {
			reserved: 1,
			total: 5,
		},
	},
	{
		id: '3',
		logo: LOGO_URL,
		name: 'Example DAO 3',
		consensus: 76,
		activeProposals: 4,
		LPTokens: 1000,
		email: 'example@mail.com',
		social: [{ type: Social.Telegram, url: 'http://t.me/' }],
		distributionRules: [
			{ walletAddress: '43fjYR48JEfkfof83436437DJfewlr8', tokens: 100, percent: 30 },
			{ walletAddress: '4343878ffr3ufjrn8rfufHJR48fufj33f', tokens: 100, percent: 30 },
		],
		slots: {
			reserved: 5,
			total: 5,
		},
	},
];

export const VOTING_TYPE: IVotingType[] = [
	{ id: 1, label: 'Proportional to token amount' },
	{ id: 2, label: 'One wallet = one vote' },
];

export const PROPOSALS: IProposal[] = [
	{
		id: '1',
		name: 'Add new GP - Bob',
		description: 'Let’s add Bob, he’s new specialist in our team',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[0],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
		votingType: VOTING_TYPE[0],
	},
	{
		id: '2',
		name: 'Remove GP - Bob',
		description: 'Let’s remove Bob, he’s out of our team anymore',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[1],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
		votingType: VOTING_TYPE[0],
	},
	{
		id: '3',
		name: 'Transfer GP tokens',
		description: 'I propose transfering 500 GP tokens to fund project X',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[2],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
		votingType: VOTING_TYPE[0],
	},
	{
		id: '4',
		name: 'Change transfer status',
		description: 'Let’s changing the GP token transfer status to Transferable',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[3],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
	},
	{
		id: '5',
		name: 'Change general consensus',
		description: 'I propose updating the general consensus rules',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[4],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
	},
	{
		id: '6',
		name: 'Send funds',
		description: 'Let’s sending 1000 USDT to pay a contractor',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[5],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
	},
	{
		id: '7',
		name: 'Change DAO name',
		description: 'Let’s changing the DAO name for better branding',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[6],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
	},
	{
		id: '8',
		name: 'Should we launch a new campaign?',
		description: 'Let’s voting on launching a new marketing campaign',
		consensus: 51,
		endDate: new Date(),
		type: ProposalTypes[7],
		status: { id: 1, label: 'active' },
		dao: DAOS_MOCK[0],
		votes: {
			agree: 45,
			disagree: 25,
		},
	},
];

export const NFTS: INft[] = [
	{
		id: 'ABC12345',
		hash: '123456',
		imgUrl: LOGO_URL,
	},
	{
		id: 'DEF12345',
		hash: '324323234',
		imgUrl: LOGO_URL,
	},
];
