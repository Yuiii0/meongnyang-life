import { auth } from "@/api/auth/auth.api";
import { User, onAuthStateChanged } from "firebase/auth";
import create from "zustand";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export const initializeAuth = () => {
  const { setUser, setLoading } = useAuthStore.getState();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  });
};
