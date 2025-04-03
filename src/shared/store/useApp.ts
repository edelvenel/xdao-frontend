import { NAVIGATION_HEIGHT } from "shared/constants";
import { create } from "zustand";

export interface IAppStore {
  navigationHeight: number;
  setNavigationHeight: (height: number) => void;
}

export const useApp = create<IAppStore>((set) => ({
  navigationHeight: NAVIGATION_HEIGHT,
  setNavigationHeight: (height) => {
    set({ navigationHeight: height });
  },
}));
