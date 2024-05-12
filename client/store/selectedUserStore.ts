// src/store/selectedUserStore.ts
import { create } from 'zustand';

interface SelectedUserState {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
}

const useSelectedUserStore = create<SelectedUserState>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
}));

export default useSelectedUserStore;