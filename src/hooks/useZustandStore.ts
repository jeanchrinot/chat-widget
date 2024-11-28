import { create } from "zustand";
import { Conversation, User, Message, Account } from "@prisma/client";

export interface TConversation extends Conversation {
  messages: Message[] & { account: Account & { user: User } }[];
}

export type ZustandStore = {
  conversations: TConversation[];
  currentConversationId: string | null;
  setConversations: (conversations: TConversation[]) => void;
  setCurrentConversationId: (id: string | null) => void;
};

export const useZustandStore = create<ZustandStore>((set) => ({
  conversations: [],
  currentConversationId: null,
  setConversations: (conversations: TConversation[]) => set({ conversations }),
  setCurrentConversationId: (id: string | null) =>
    set({ currentConversationId: id }),
}));
