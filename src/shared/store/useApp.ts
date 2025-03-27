import { create } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppStore {}

export const useApp = create<IAppStore>(() => ({}));
