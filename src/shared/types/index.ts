import { JSX } from 'react';

export type IIconProps = React.SVGProps<SVGSVGElement>;
export type IIconComponent = JSX.Element;

export type IDao = {
	address: string;
	logo: string;
	name: string;
	jetton_address: string;
	activeProposals: number;
	LPTokens: string;
	description?: string;
	email?: string;
	social: ISocial[];
	status: DaoStatus;
	consensus: number;
	distributionRules: IDistributionRule[];
	slots: {
		total: number;
		reserved: number;
	};
	plugins: IPlugin[];
	owner_address: string;
};

export type IPendingDao = {
	name: string;
	ownerRawAddress: string;
};

export type IPendingProposal = {
	name: string;
	ownerRawAddress: string;
	type: ProposalType;
	description: string;
};

export type IHashedData<T> = {
	data: T;
	hash: string;
	expiresAt: number;
};

export enum DaoStatus {
	Transferable = 'transferable',
	NonTransferable = 'non-transferable',
}

export type ISocial = {
	type: Social;
	url: string;
};

export type INft = {
	id: number;
	imgUrl: string;
	tonScan: string;
};

export enum Social {
	Telegram = 'telegram',
	Youtube = 'youtube',
	Instagram = 'instagram',
}

export enum ProposalType {
	AddGP = 'add_gp',
	RemoveGP = 'remove_gp',
	TransferGPTokens = 'transfer_gp_tokens',
	ChangeGPTransferStatus = 'change_gp_transfer_status',
	ChangeGeneralConsensus = 'change_general_consensus',
	SendDAOFunds = 'send_dao_funds',
	ChangeDAOName = 'change_dao_name',
	// CustomProposal = 'custom_proposal',
}

export enum ProposalKey {
	CallJettonMint = 'MasterDAO_CallJettonMint',
	CallJettonBurn = 'MasterDAO_CallJettonBurn',
	CallJettonTransfer = 'MasterDAO_CallJettonTransfer',
	ChangeTransferStatus = 'MasterDAO_ChangeTransferStatus',
	ChangeSuccessPercentage = 'MasterDAO_ChangeSuccessPercentage',
	CallPlugin = 'MasterDAO_CallPlugin',
	ChangeMetadata = 'MasterDAO_ChangeMetadata',
}

export enum DaoType {
	Equal = 'equal',
	Proportional = 'proportional',
}

export type IToken = {
	address: string;
	name: string;
	imgUrl: string;
	amount: number;
	rate: number;
};

export interface IProposal {
	address: string;
	name: string;
	description: string;
	consensus: number;
	endDate: Date;
	createdAt: Date;
	createdBy: string;
	status: ProposalStatus;
	type: ProposalType;
	daoAddress: string;
	votingType?: IVotingType;
	currentVotes: number;
	userVote: IUserVote | null;
	data: any;
}

export enum ProposalStatus {
	Active = 'active',
	Rejected = 'rejected',
	Pending = 'pending',
	Executed = 'executed',
}

export enum ProposalFilter {
	AllProposals = 'all proposals',
	Active = 'active',
	Executed = 'executed',
	Rejected = 'rejected',
}

export interface IVotingType {
	id: number;
	label: string;
}

export type IOptionWithNote = {
	id: number;
	value: string;
	note?: string;
};

export type IDistributionRule = {
	walletAddress: string;
	tokens: number | null;
	percent: number | null;
};

export type IVote = {
	walletAddress: string;
	impact: number;
};

export type IUserVote = {
	label: string;
	impact: number;
};

export type IHolder = {
	jetton_wallet_address: string;
	owner_address: string;
	balance: string;
};

export type IPlugin = {
	address: string;
	type: string;
};

export type IJetton = {
	address: string;
	name: string;
	amount: number;
	imgUrl: string;
	url: string;
	rate: number;
};

export type IRate = {
	currency: string;
	rate: number;
};
