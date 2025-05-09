import { JSX } from 'react';

export type IIconProps = React.SVGProps<SVGSVGElement>;
export type IIconComponent = JSX.Element;

export type IDao = {
	id: string;
	address: string;
	logo: string;
	name: string;
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
	id: string;
	hash: string;
	imgUrl: string;
};

export type IProposalType = {
	id: number;
	name: string;
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
	CustomProposal = 'custom_proposal',
}

export enum DaoType {
	Equal = 'equal',
	Proportional = 'proportional',
}

export type IToken = {
	id: string;
	name: string;
	imgUrl: string;
	amount: number;
	rate: number;
};

export interface IProposal {
	id: string;
	name: string;
	description: string;
	consensus: number;
	endDate: Date;
	createdAt: Date;
	votes: IVote;
	status: IProposalStatus;
	type: IProposalType;
	dao: IDao;
	votingType?: IVotingType;
	userVote: IUserVote | null;
}

export interface IProposalStatus {
	id: number;
	label: string;
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
	agree: { walletAddress: string; impact: number }[];
};

export type IUserVote = {
	label: string;
	impact: number;
};
