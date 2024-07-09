import { create } from "zustand";

type UserStore = {
  Name: string;
  UserId: string;
  setName: (name: string) => void;
  setUserId: (userId: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  Name: "",
  UserId: "",
  setName: (name) => set({ Name: name }),
  setUserId: (id) => set({ UserId: id }),
}));
