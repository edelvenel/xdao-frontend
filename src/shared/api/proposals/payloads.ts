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
  type: ProposalType.CreateOnChainPoll;
  name: string;
  description: string;
  votingDuration: number;
  newName: string;
  votingType: string;
  token: string;
  lpPool: string;
  minTokens: string;
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
