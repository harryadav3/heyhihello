// src/store/userStore.ts
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  friends: string[];
  status: 'AVAILABLE' |  'BUSY';
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        Cookies.remove('token');
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;