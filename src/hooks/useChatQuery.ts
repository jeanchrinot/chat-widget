import { useMutation } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"

interface InitiateChatWidgetProps {
  channelId: string | null
}

interface GetWidgetSettingsProps {
  channelId: string | null
  token: string | null
}

interface SendMessageProps {
  sessionId: string | null
  message: string | null
  token: string | null
}

export const useInitiateChatWidget = () => {
  return useMutation({
    mutationFn: async ({ channelId }: InitiateChatWidgetProps) => {
      const response = await apiClient.post("/api/chat/widget/initiate", {
        channelId,
      })
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
