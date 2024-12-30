import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Conversation, User, Message, Account, Transfer } from "@prisma/client"

export interface TConversation extends Conversation {
  messages: Message[] & { account: Account & { user: User } }[]
}

interface BotSettings {
  botName: string
  botVoice: string
  primaryLang: string
}

interface themeColor {
  bg: string
  mainColor: string
  text: string
  name: string
}

interface Agent {
  id: string
  agentType: string
  name: string
  image: string
}

interface WidgetSettings {
  enableLiveChat: boolean | number
  inQMessage: string
  offlineMessage: string
  onlineStatus: string
  offlineStatus: string
  buttonImage: string
  buttonText: string
  avatar: string
  greetingMessage: string
  themeColor: themeColor
}

export type Store = {
  channelId: string | null
  sessionId: string | null
  user: User | null
  agent: Agent | null
  botAgent: Agent | null
  userToken: string | null
  conversation: Conversation | null
  messages: Message[]
  conversations: TConversation[]
  currentConversationId: string | null
  quickReplies: string[]
  selectedQuickReply: string | null
  botSettings: BotSettings | null
  widgetSettings: WidgetSettings | null
  transfer: Transfer | null
  startNewSession: boolean
  setChannelId: (id: string | null) => void
  setSessionId: (id: string | null) => void
  setUserToken: (token: string | null) => void
  setUser: (user: User) => void
  setAgent: (agent: Agent) => void
  setBotAgent: (agent: Agent) => void
  setConversation: (conversation: Conversation) => void
  setMessages: (messages: Message[]) => void
  setConversations: (conversations: TConversation[]) => void
  setCurrentConversationId: (id: string | null) => void
  setQuickReplies: (quickReplies: string[]) => void
  setSelectedQuickReply: (quickReply: string) => void
  setBotSettings: (botSettings: BotSettings) => void
  setWidgetSettings: (widgetSettings: WidgetSettings) => void
  setTransfer: (transfer: Transfer) => void
  setStartNewSession: (bool: boolean) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      channelId: "674b4c35b0a96b112bfe8329",
      sessionId: null,
      user: null,
      agent: null,
      botAgent: null,
      userToken: null,
      conversation: null,
      messages: [],
      conversations: [],
      currentConversationId: null,
      quickReplies: [],
      selectedQuickReply: null,
      botSettings: null,
      widgetSettings: null,
      transfer: null,
      startNewSession: false,
      setChannelId: (id: string | null) => set({ channelId: id }),
      setUserToken: (token: string | null) => set({ userToken: token }),
      setSessionId: (id: string | null) => set({ sessionId: id }),
      setUser: (user: User) => set({ user }),
      setAgent: (agent: Agent) => set({ agent }),
      setBotAgent: (agent: Agent) => set({ botAgent: agent }),
      setConversation: (conversation: Conversation) => set({ conversation }),
      setMessages: (messages: Message[]) => set({ messages }),
      setConversations: (conversations: TConversation[]) =>
        set({ conversations }),
      setCurrentConversationId: (id: string | null) =>
        set({ currentConversationId: id }),
      setQuickReplies: (quickReplies: string[]) => set({ quickReplies }),
      setSelectedQuickReply: (quickReply: string) =>
        set({ selectedQuickReply: quickReply }),
      setBotSettings: (botSettings: BotSettings) => set({ botSettings }),
      setWidgetSettings: (widgetSettings: WidgetSettings) =>
        set({ widgetSettings }),
      setTransfer: (transfer: Transfer) => set({ transfer }),
      setStartNewSession: (bool: boolean) => set({ startNewSession: bool }),
    }),
    {
      name: "chat-store", // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        agent: state.agent,
        botAgent: state.botAgent,
        userToken: state.userToken,
        sessionId: state.sessionId,
        messages: state.messages,
        conversation: state.conversation,
        transfer: state.transfer,
      }), // Persist some states`
    }
  )
)
