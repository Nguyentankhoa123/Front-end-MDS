import { create } from "zustand";

interface ChatStore {
  isOpenChat: boolean;
  roomName: string;
  drugstore: string;
  setIsOpenChat: (isOpenChat: boolean) => void;
  setRoomName: (roomName: string) => void;
  setDrugstore: (drugstore: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpenChat: false,
  roomName: "",
  drugstore: "",
  setIsOpenChat: (isOpenChat: boolean) => set({ isOpenChat }),
  setRoomName: (roomName: string) => set({ roomName }),
  setDrugstore: (drugstore: string) => set({ drugstore }),
}));
