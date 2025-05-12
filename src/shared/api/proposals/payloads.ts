import { Address, Cell, Dictionary, toNano } from '@ton/core';
import { ProposalsBuilder } from 'shared/cell-builders';
import { IDao, IToken, ProposalType } from 'shared/types';

export type ICreateProposalPayload =
	| ICreateAddGPProposalPayload
	| ICreateRemoveGPProposalPayload
	| ICreateChangeDAONameProposalPayload
	| ICreateChangeGeneralConsensusProposalPayload
	| ICreateChangeGPTransferStatusProposalPayload
	// | ICreateCustomProposalPayload
	| ICreateSendFundsProposalPayload
	| ICreateTransferGPProposalPayload;

export type ICreateAddGPProposalPayload = {
	type: ProposalType.AddGP;
	name: string;
	description: string;
	walletAddress: string;
	tokenAmount: number;
	votingDuration: number;
};

export type ICreateRemoveGPProposalPayload = {
	type: ProposalType.RemoveGP;
	name: string;
	description: string;
	jettonWalletAddressToRemove: string;
	jettonWalletOwnerAddressToRemove: string;
	votingDuration: number;
	tokenAmount: number;
};

export type ICreateChangeDAONameProposalPayload = {
	type: ProposalType.ChangeDAOName;
	name: string;
	description: string;
	votingDuration: number;
	newName: string;
};

export type ICreateChangeGeneralConsensusProposalPayload = {
	type: ProposalType.ChangeGeneralConsensus;
	name: string;
	description: string;
	votingDuration: number;
	currentConsensus: number;
};

export type ICreateChangeGPTransferStatusProposalPayload = {
	type: ProposalType.ChangeGPTransferStatus;
	name: string;
	description: string;
	votingDuration: number;
	newStatus: string;
};

// export type ICreateCustomProposalPayload = {
// 	type: ProposalType.CustomProposal;
// 	name: string;
// 	description: string;
// 	votingDuration: number;
// 	newName: string;
// 	votingType: string;
// 	token: string;
// 	lpPool: number | null;
// 	tokenAddress: string | null;
// 	tokenSymbol: string | null;
// 	minTokens: number;
// };

export type ICreateSendFundsProposalPayload = {
	type: ProposalType.SendDAOFunds;
	name: string;
	description: string;
	votingDuration: number;
	fromDAO: IDao;
	recipientAddress: string;
	token: IToken;
	tokenAmount: number;
	pluginAddress: string;
};

export type ICreateTransferGPProposalPayload = {
	type: ProposalType.TransferGPTokens;
	name: string;
	description: string;
	votingDuration: number;
	fromJettonWalletAddress: string;
	fromJettonWalletOwnerAddress: string;
	tokenAmount: number;
	toWalletAddress: string;
};

export const proposalsBuilders = (payload: ICreateProposalPayload) => {
	switch (payload.type) {
		case ProposalType.RemoveGP: {
			return ProposalsBuilder.buildCallJettonBurn(
				toNano(payload.tokenAmount),
				Address.parse(payload.jettonWalletAddressToRemove),
				Address.parse(payload.jettonWalletOwnerAddressToRemove)
			);
		}
		case ProposalType.TransferGPTokens: {
			return ProposalsBuilder.buildCallJettonTransfer(
				payload,
				Address.parse(payload.fromJettonWalletAddress),
				Address.parse(payload.fromJettonWalletOwnerAddress)
			);
		}
		case ProposalType.ChangeGeneralConsensus: {
			return ProposalsBuilder.buildChangeSuccessPercentage(payload.currentConsensus);
		}
		case ProposalType.AddGP: {
			const dict = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
			dict.set(Address.parse(payload.walletAddress), toNano(payload.tokenAmount));
			return ProposalsBuilder.buildCallJettonMint(dict); // this method support dictionary, but payload only 1 object.
		}

		case ProposalType.ChangeDAOName: {
			return ProposalsBuilder.buildChangeMetadata(payload);
		}

		case ProposalType.ChangeGPTransferStatus: {
			return new Cell(); //TODO: replace (build fix)
		}

		case ProposalType.SendDAOFunds: {
			console.log(payload);
			console.log(payload.pluginAddress);
			return new Cell(); //TODO: replace (build fix)
		}
	}
};
