import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Message {
  type: "sent" | "received";
  message: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  sendMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      sendMessage: (message) => set({ messages: [...get().messages, message] }),
    }),
    {
      name: "chat-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
