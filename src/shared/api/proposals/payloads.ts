import {
	Address,
	beginCell,
	Cell,
	Dictionary,
	SendMode,
	toNano,
} from '@ton/ton';
import {JettonBuilder, ProposalsBuilder} from 'shared/cell-builders';
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
	tokenAmount: number;
	votingDuration: number;
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
				Address.parse(payload.jettonWalletAddressToRemove),
				Address.parse(payload.jettonWalletOwnerAddressToRemove),
				payload.tokenAmount
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
			const pluginAddr = Address.parse(payload.pluginAddress);
			let msg: Cell;
			const dest = Address.parse(payload.recipientAddress);
			if (payload.token.address == 'native') {
				const amount = toNano(payload.tokenAmount); // 10 ^ decimals -> decimals for toncoin = 9 always
				msg = beginCell()
					.storeUint(0x10, 6) // no bounce
					.storeAddress(dest) // dest
					.storeCoins(amount) // amount
					.storeUint(0, 107)
					.endCell()
			} else {
				const decimals = 9; // TODO: fetch token.decimals
				const pluginJettonWallet = Address.parse(payload.pluginAddress) // TODO: fetch plugin's jetton wallet
				const amount = payload.tokenAmount * Math.pow(10, decimals)
				const transferBody = JettonBuilder.buildJettonTransfer({
					amount,
					destination: dest,
					responseDestination: dest,
					forwardTonAmount: 1
				})
				msg = beginCell()
					.storeUint(0x18, 6) // bounce
					.storeAddress(pluginJettonWallet) // dest
					.storeCoins(amount) // amount
					.storeUint(1, 107)
					.storeRef(transferBody)
					.endCell()
			}
			return ProposalsBuilder.buildCallPlugin(
				pluginAddr,
				beginCell()
					.storeUint(0, 32) // simple send
					.storeUint(0, 64) // TODO: query id
					.storeUint(SendMode.PAY_GAS_SEPARATELY, 8)
					.storeRef(msg) // 1st message
					.endCell()
			);
		}
	}
};
