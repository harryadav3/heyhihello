// src/{store}/selectedUserStore.ts
import {create} from 'zustand';
import { Friend } from '@/app/types/types';

interface SelectedUserState {
  selectedUser: Friend | null;
  setSelectedUser: (user: Friend | null) => void;
}

const useSelectedUserStore = create<SelectedUserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export default useSelectedUserStore;