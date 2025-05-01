import { DaoStatus, IDao, INft, IProposal, IToken, IVotingType, Social } from 'shared/types';
import logoExample from '../../assets/images/logo-example.png';

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
		address: 'Y4fk38458fme3f93mi3fc3ik44r6809',
		logo: logoExample,
		name: 'Example DAO 1',
		activeProposals: 2,
		LPTokens: 500,
		status: DaoStatus.Transferable,
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
		address: '774nKO993lf0999r473fUU4574',
		logo: logoExample,
		name: 'Example DAO 2',
		activeProposals: 1,
		consensus: 43,
		LPTokens: 300,
		status: DaoStatus.NonTransferable,
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
		address: '9947wmvUrn38jf48003kKKD84723f53rc3',
		logo: logoExample,
		name: 'Example DAO 3',
		consensus: 76,
		activeProposals: 4,
		LPTokens: 1000,
		status: DaoStatus.NonTransferable,
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
		imgUrl: logoExample,
	},
	{
		id: 'DEF12345',
		hash: '324323234',
		imgUrl: logoExample,
	},
];

export const TOKENS: IToken[] = [
	{
		id: '0',
		name: 'TON',
		imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
		amount: 125,
		rate: 10.0987,
	},
	{
		id: '1',
		name: 'BTC',
		imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
		amount: 59,
		rate: 3.0953,
	},
	{
		id: '2',
		name: 'USDT',
		imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
		amount: 12,
		rate: 8.362,
	},
];
