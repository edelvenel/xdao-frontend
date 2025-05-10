import { DaoType, IDistributionRule } from "shared/types";

export type ICreateDaoPayload =
  | ICreateDaoProportionalPayload
  | ICreateDaoEqualPayload;


export type ICreateDaoProportionalPayload = {
  type: DaoType.Proportional;
  daoName: string;
  daoTokenName: string;
  daoTokenSymbol: string;
  distributionRules: IDistributionRule[];
  consensusPercent: number;
};

export type ICreateDaoEqualPayload = {
  type: DaoType.Equal;
  daoName: string;
  daoTokenName: string;
  daoTokenSymbol: string;
  walletAddresses: string[];
  consensus: number;
};
