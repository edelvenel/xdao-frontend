// import { IConfig } from "shared/types";
// import { create } from "zustand";

// export interface IConfigStore {
//   config: IConfig | null;
//   fetchConfig: () => Promise<void>;
// }

// export const useConfig = create<IConfigStore>((set) => ({
//   config: null,
//   fetchConfig: async () => {
//     const config: IConfig = {
//       daoFilters: [],
//       proposalFilters: [],
//       proposalTypes: [{ id: 1, imgUrl: "", name: "Add GP" }],
//     };

//     set({ config });
//   },
// }));
