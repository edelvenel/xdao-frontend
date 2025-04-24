import { JSX } from "react";

export type IIconProps = React.SVGProps<SVGSVGElement>;
export type IIconComponent = JSX.Element;

export type IDao = {
  id: string;
  logo: string;
  name: string;
  activeProposals: number;
  LPTokens: number;
  description?: string;
  email?: string;
  social: ISocial[];
};

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
  Telegram = "telegram",
  Youtube = "youtube",
  Instagram = "instagram",
}

export enum ProposalType {
  AddGP = "add_gp",
  RemoveGP = "remove_gp",
  TransferGPTokens = "transfer_gp_tokens",
  ChangeGPTransferStatus = "change_gp_transfer_status",
  ChangeGeneralConsensus = "change_general_consensus",
  SendDAOFunds = "send_dao_funds",
  ChangeDAOName = "change_dao_name",
  CreateOnChainPoll = "create_on_chain_poll",
}

export enum DaoType {
  Equal = "equal",
  Proportional = "proportional",
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
  votes: {
    agree: number;
    disagree: number;
  };
  status: IProposalStatus;
  type: IProposalType;
  dao: IDao;
  votingType?: IVotingType;
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
