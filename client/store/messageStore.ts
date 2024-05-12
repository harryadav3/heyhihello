// src/store/messageStore.ts
import {create} from 'zustand';

interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
}

interface MessageState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;