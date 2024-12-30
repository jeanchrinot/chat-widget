import { useMutation } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"

interface InitiateChatWidgetProps {
  channelId: string | null
  userId: string | null
}

interface GetConversationProps {
  channelId: string | null
  userId: string | null
  token: string | null
}

interface GetWidgetSettingsProps {
  token: string | null
}

interface SendMessageProps {
  sessionId: string | null
  message: string | null
  token: string | null
}

export const useInitiateChatWidget = () => {
  return useMutation({
    mutationFn: async ({ channelId, userId }: InitiateChatWidgetProps) => {
      const response = await apiClient.post("/api/chat/widget/initiate", {
        channelId,
        userId,
      })
      return response.data
    },
  })
}

export const useGetWidgetConversation = () => {
  return useMutation({
    mutationFn: async ({ channelId, userId, token }: GetConversationProps) => {
      const response = await apiClient.post(
        "/api/chat/widget/conversation",
        { channelId, userId, token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
  })
}

export const useGetWidgetSettings = () => {
  return useMutation({
    mutationFn: async ({ token }: GetWidgetSettingsProps) => {
      const response = await apiClient.get("/api/chat/widget/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
  })
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async ({ sessionId, message, token }: SendMessageProps) => {
      const response = await apiClient.post(
        "/api/chat/widget/message",
        { sessionId, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
  })
}
