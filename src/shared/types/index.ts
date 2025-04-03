import { JSX } from "react";

export type IIconProps = React.SVGProps<SVGSVGElement>;
export type IIconComponent = JSX.Element;

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
