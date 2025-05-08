import { create } from "zustand";

interface IAuthProps {
  token: string | null;
  setToken: (newToken: string) => void;
  signOut: () => void;
}

export const useAuth = create<IAuthProps>((set) => ({
  get token() {
    return localStorage.getItem("bearer_token");
  },
  setToken: (newToken) => {
    localStorage.setItem("bearer_token", newToken);
    set({ token: newToken });
  },
  signOut: () => {
    localStorage.removeItem("bearer_token");
    set({ token: null });
  },
}));