import { API } from "shared/api";
import { MeDto } from "shared/api/me/dto/MeDto";
import { create } from "zustand";
interface IMeProps {
  me: MeDto | null;
  fetchMe: () => Promise<boolean>;
}

export const useMe = create<IMeProps>((set) => ({
  me: null,
  fetchMe: async () => {
    const data = await API.Me.getMe();

    if (data) {
      set({ me: data });
      return true;
    } else {
      return false;
    }
  },
}));
