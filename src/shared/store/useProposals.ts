// import { IProposal, IProposalFilter } from "shared/types";
// import { create } from "zustand";
// import { store } from ".";

// export interface IProposalsStore {
//   proposals: IProposal[];
//   fetchProposals: (filter: IProposalFilter) => Promise<void>;
// }

// export const useProposals = create<IProposalsStore>((set) => ({
//   proposals: [],
//   fetchProposals: async () => {
//     const { daos } = store.useDaos();
//     const { config } = store.useConfig();
//     const proposalsMock: IProposal[] = [
//       {
//         id: "1",
//         consensus: 51,
//         dao: daos[0],
//         description: "Let’s remove Bob, he’s out of our team anymore",
//         name: "Remove GP - Bob",
//         endDate: new Date("20250412"),
//         status: { id: 0, label: "pending" },
//         type: config?.proposalTypes[0],
//         votes: {
//           agree: 45,
//           disagree: 25,
//         },
//       },
//       {
//         id: "2",
//         consensus: 90,
//         dao: daos[1],
//         description: "Let’s add new member",
//         name: "Add new GP",
//         endDate: new Date("20250423"),
//         status: "active",
//         type: "Add GP",
//         votes: {
//           agree: 82,
//           disagree: 8,
//         },
//       },
//       {
//         id: "3",
//         consensus: 100,
//         dao: daos[2],
//         description: "Let’s remove Bob, he’s out of our team anymore",
//         name: "Add new GP - Bob",
//         endDate: new Date("20250402"),
//         status: "executed",
//         type: "Remove GP",
//         votes: {
//           agree: 50,
//           disagree: 21,
//         },
//       },
//     ];
//     set({ proposals: proposalsMock });
//   },
// }));
