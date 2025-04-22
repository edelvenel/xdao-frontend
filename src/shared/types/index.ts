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
  logo: string;
  name: string;
};

export enum Social {
  Telegram = "telegram",
  Youtube = "youtube",
  Instagram = "instagram",
}

export const LOGO_URL =
  "https://s3-alpha-sig.figma.com/img/42ae/6ec1/60426ed7c2345cb0f3fa82362c4448c6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FP2xA~duxcKvBndxlZshuwejmfv2HCx870FkWLQEFtLghUqURStu727g9JfMKmssLHH9zgeuPBXuJR5Ezg6a7EC1tFMuJToC3Orumoi9BJwOSbA7YPhmevC4-knkwzFpeybPEAq9yIFuyr78og6X6NP5XA~z7Ci-EAiYDWyL32rlP8JojRL8PvVl5g03KJQhp0TU5tAlT-Mw-73jLVeAK3DMVMghFpqBcPS73Ewf6OcMSCxRQgSPV266ShogW4wP1u3u-0DnOaRISt75RhILpD~eO32EYUQ4dwI2RwsTAd7OBJiYI7P8RHsinn1FgxNmUPT86RkWmAahPOelmqJHGA__";

export const ProposalTypes = [
  { id: 1, logo: LOGO_URL, name: "Add General Partner" },
  { id: 2, logo: LOGO_URL, name: "Remove General Partner" },
  { id: 3, logo: LOGO_URL, name: "Transfer GP Tokens" },
  { id: 4, logo: LOGO_URL, name: "Change GP Transfer Status" },
  { id: 5, logo: LOGO_URL, name: "Change General Consensus" },
  { id: 6, logo: LOGO_URL, name: "Send DAO Funds" },
  { id: 7, logo: LOGO_URL, name: "Change DAO Name" },
  { id: 8, logo: LOGO_URL, name: "Create On-Chain Poll" },
];

export const DAOS_MOCK: IDao[] = [
  {
    id: "1",
    logo: LOGO_URL,
    name: "Example DAO 1",
    activeProposals: 2,
    LPTokens: 500,
    email: "email@mail.com",
    description: "Some description",
    social: [
      { type: Social.Telegram, url: "http://t.me/" },
      { type: Social.Youtube, url: "http://youtube.com/" },
    ],
  },
  {
    id: "2",
    logo: LOGO_URL,
    name: "Example DAO 2",
    activeProposals: 1,
    LPTokens: 300,
    email: "xdao@mail.com",
    social: [
      { type: Social.Telegram, url: "http://t.me/" },
      { type: Social.Youtube, url: "http://youtube.com/" },
    ],
  },
  {
    id: "3",
    logo: LOGO_URL,
    name: "Example DAO 3",
    activeProposals: 4,
    LPTokens: 1000,
    email: "example@mail.com",
    social: [{ type: Social.Telegram, url: "http://t.me/" }],
  },
];

export const VOTING_TYPE: IVotingType[] = [
  { id: 1, label: "Proportional to token amount" },
  { id: 2, label: "One wallet = one vote" },
];

export const PROPOSALS: IProposal[] = [
  {
    id: "1",
    name: "Add new GP - Bob",
    description: "Let’s add Bob, he’s new specialist in our team",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[0],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
    votingType: VOTING_TYPE[0],
  },
  {
    id: "2",
    name: "Remove GP - Bob",
    description: "Let’s remove Bob, he’s out of our team anymore",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[1],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
    votingType: VOTING_TYPE[0],
  },
  {
    id: "3",
    name: "Transfer GP tokens",
    description: "I propose transfering 500 GP tokens to fund project X",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[2],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
    votingType: VOTING_TYPE[0],
  },
  {
    id: "4",
    name: "Change transfer status",
    description: "Let’s changing the GP token transfer status to Transferable",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[3],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
  },
  {
    id: "5",
    name: "Change general consensus",
    description: "I propose updating the general consensus rules",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[4],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
  },
  {
    id: "6",
    name: "Send funds",
    description: "Let’s sending 1000 USDT to pay a contractor",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[5],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
  },
  {
    id: "7",
    name: "Change DAO name",
    description: "Let’s changing the DAO name for better branding",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[6],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
  },
  {
    id: "8",
    name: "Should we launch a new campaign?",
    description: "Let’s voting on launching a new marketing campaign",
    consensus: 51,
    endDate: new Date(),
    type: ProposalTypes[7],
    status: { id: 1, label: "active" },
    dao: DAOS_MOCK[0],
    votes: {
      agree: 45,
      disagree: 25,
    },
  },
];

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
