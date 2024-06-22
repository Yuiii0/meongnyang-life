import { UserInfo } from "@/types/User/User.type";

import { create } from "zustand";

type UserState = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
