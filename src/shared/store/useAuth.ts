import { create } from "zustand";

interface IAuthProps {
  token: string | null;
  setToken: (newToken: string) => void;
  signOut: () => void;
}

export const useAuth = create<IAuthProps>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  signOut: () => {
    set({ token: null });
    localStorage.removeItem("bearer_token");
  },
}));
