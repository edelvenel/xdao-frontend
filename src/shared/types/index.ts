import { JSX } from "react";

export type IIconProps = React.SVGProps<SVGSVGElement>;
export type IIconComponent = JSX.Element;

export type IDao = {
  id: number;
  logo: string;
  name: string;
};

export type IProposalType = {
  id: number;
  logo: string;
  name: string;
};

export const LOGO_URL =
  "https://s3-alpha-sig.figma.com/img/42ae/6ec1/60426ed7c2345cb0f3fa82362c4448c6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FP2xA~duxcKvBndxlZshuwejmfv2HCx870FkWLQEFtLghUqURStu727g9JfMKmssLHH9zgeuPBXuJR5Ezg6a7EC1tFMuJToC3Orumoi9BJwOSbA7YPhmevC4-knkwzFpeybPEAq9yIFuyr78og6X6NP5XA~z7Ci-EAiYDWyL32rlP8JojRL8PvVl5g03KJQhp0TU5tAlT-Mw-73jLVeAK3DMVMghFpqBcPS73Ewf6OcMSCxRQgSPV266ShogW4wP1u3u-0DnOaRISt75RhILpD~eO32EYUQ4dwI2RwsTAd7OBJiYI7P8RHsinn1FgxNmUPT86RkWmAahPOelmqJHGA__";

export const ProposalTypes = [
  { id: 1, logo: LOGO_URL, name: "Add GP" },
  { id: 2, logo: LOGO_URL, name: "Remove GP" },
  { id: 3, logo: LOGO_URL, name: "Transfer GP Tokens" },
  { id: 4, logo: LOGO_URL, name: "Change GP Transfer Status" },
  { id: 5, logo: LOGO_URL, name: "Change General Consensus" },
  { id: 6, logo: LOGO_URL, name: "Send DAO Funds" },
  { id: 7, logo: LOGO_URL, name: "Change DAO Name" },
  { id: 8, logo: LOGO_URL, name: "Create On-Chain Poll" },
];

export type IToken = {
  id: string;
  name: string;
  imgUrl: string;
  amount: number;
  rate: number;
};

// export interface IProposal {
//   id: string;
//   name: string;
//   description: string;
//   consensus: number;
//   endDate: Date;
//   votes: {
//     agree: number;
//     disagree: number;
//   };
//   status: IProposalStatus;
//   type: IProposalType;
//   dao: IDao;
// }

// export interface IProposalStatus {
//   id: number;
//   label: string;
// }

// export interface IProposalType {
//   id: number;
//   name: string;
//   imgUrl: string;
// }

// export interface IDao {
//   id: string;
//   name: string;
//   imgUrl: string;
// }

// export interface IProposalFilter {
//   search: string | null;
//   filter: number;
// }

// export interface IDaoFilter {
//   search: string | null;
//   filter: number;
// }

// export interface IFilter {
//   id: number;
//   name: string;
// }

// export interface IConfig {
//   proposalTypes: IProposalType[];
//   proposalFilters: IFilter[];
//   daoFilters: IFilter[];
// }
