import { Address } from "@ton/core";
import { JettonBuilder, ProposalsBuilder } from "shared/cell-builders";
import { IDao, IToken, ProposalType } from "shared/types";

export type ICreateProposalPayload =
	| ICreateAddGPProposalPayload
	| ICreateRemoveGPProposalPayload
	| ICreateChangeDAONameProposalPayload
	| ICreateChangeGeneralConsensusProposalPayload
	| ICreateChangeGPTransferStatusProposalPayload
	| ICreateCustomProposalPayload
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
	gpToRemove: string;
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

export type ICreateCustomProposalPayload = {
	type: ProposalType.CustomProposal;
	name: string;
	description: string;
	votingDuration: number;
	newName: string;
	votingType: string;
	token: string;
	lpPool: number | null;
	tokenAddress: string | null;
	tokenSymbol: string | null;
	minTokens: number;
};

export type ICreateSendFundsProposalPayload = {
	type: ProposalType.SendDAOFunds;
	name: string;
	description: string;
	votingDuration: number;
	fromDAO: IDao;
	recipientAddress: string;
	token: IToken;
	tokenAmount: number;
};

export type ICreateTransferGPProposalPayload = {
	type: ProposalType.TransferGPTokens;
	name: string;
	description: string;
	votingDuration: number;
	fromWalletAddress: string;
	tokenAmount: number;
	toWalletAddress: string;
};

export const proposalsBuilders = (responseDestination: Address) => ({
  [ProposalType.AddGP]: (payload: ICreateAddGPProposalPayload) => (
    console.log(payload.walletAddress, 'walletAddress'),
    ProposalsBuilder.buildCallJettonMint(
      JettonBuilder.buildJettonMint({
        amount: payload.tokenAmount,
        fromAddress: Address.parse(payload.walletAddress),
        responseDestination: responseDestination,
      })
    )
  ),
  [ProposalType.RemoveGP]: (payload: ICreateRemoveGPProposalPayload) => 
    ProposalsBuilder.buildCallJettonBurn(JettonBuilder.buildJettonBurn(
      {
        amount: parseInt(payload.gpToRemove),
        responseDestination: responseDestination,
      }
    )
  ),
  [ProposalType.TransferGPTokens]: (payload: ICreateTransferGPProposalPayload) =>  ProposalsBuilder.buildCallJettonTransfer(
    JettonBuilder.buildJettonTransfer(
      {
        amount: payload.tokenAmount,
        forwardTonAmount: 1n,
        responseDestination: responseDestination,
        destination: Address.parse(payload.toWalletAddress),
      }
    )
  ),
  [ProposalType.ChangeGeneralConsensus]: (payload: ICreateChangeGeneralConsensusProposalPayload) =>  ProposalsBuilder.buildChangeSuccessPercentage(BigInt(payload.currentConsensus)),
});