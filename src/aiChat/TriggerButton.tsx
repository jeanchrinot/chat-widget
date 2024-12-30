import SwapChildren from "@/components/SwapChildren"
import { Button } from "@/components/ui/button"
import {
  useGetWidgetSettings,
  useInitiateChatWidget,
} from "@/hooks/useChatQuery"
import { useLayout } from "@/hooks/useLayout"
import { useStore } from "@/hooks/useStore"
import { assetBaseUrl } from "@/lib/api-client"
// import { useSocket } from "@/lib/socket-provider"
import { useEffect } from "react"
const TriggerButton = () => {
  const { setOpenDialog } = useLayout()

  const {
    channelId,
    user,
    userToken,
    botSettings,
    widgetSettings,
    setUserToken,
    setUser,
    setBotSettings,
    setWidgetSettings,
    setConversation,
    setTransfer,
    setMessages,
    setSessionId,
    setAgent,
    setBotAgent,
  } = useStore()

  const {
    mutate: initiateChat,
    isPending: isInitiateChatPending,
    data: chatData,
  } = useInitiateChatWidget()
  const {
    mutate: getChatWidget,
    isPending: isWidgetDataPending,
    data: widgetData,
  } = useGetWidgetSettings()
  // const { mutate: sendMessage } = useSendMessage();

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  useEffect(() => {
    if (channelId && !userToken) {
      initiateChat(
        { channelId, userId: null },
        {
          onSuccess: (data) => {
            console.log("Chat initiated:", data)
            setUserToken(data.token)
            setUser(data.user)
          },
          onError: (error) => {
            console.error("Error initiating chat:", error)
          },
        }
      )
    }
  }, [initiateChat, channelId])

  useEffect(() => {
    if (userToken) {
      getChatWidget(
        { token: userToken },
        {
          onSuccess: (data) => {
            console.log("Widget data loaded:", data)
            let botSettings = null
            let widgetSettings = null
            let agent: any = { id: "bot", agentType: "Bot" }
            if (data?.botSettings) {
              botSettings = JSON.parse(data.botSettings)
              agent = { ...agent, name: botSettings.botName }
              setBotSettings(botSettings)
            }
            if (data?.widgetSettings) {
              widgetSettings = JSON.parse(data.widgetSettings)
              setWidgetSettings(widgetSettings)
              agent = { ...agent, image: widgetSettings.avatar }
              setAgent(agent)
              setBotAgent(agent)
            }
            setConversation(data.conversation)
            setTransfer(data.transfer)
            setSessionId(data.conversation?.sessionId)
          },
          onError: (error) => {
            console.error("Error getting widget data:", error)
          },
        }
      )
    }
  }, [userToken])

  if (isInitiateChatPending || isWidgetDataPending) return ""

  return (
    <div
      className={`absolute bottom-5 right-5 flex flex-col items-end space-y-2 ${userToken ? "" : "hidden"}`}
    >
      {widgetSettings && widgetSettings.buttonText && (
        <div
          onClick={handleOpenDialog}
          className="max-w-80 self-end bg-slate-200 py-2 px-3 rounded-t-2xl rounded-bl-2xl mr-9"
        >
          <span className="w-full text-sm text-gray-500">
            {widgetSettings.buttonText}
          </span>
        </div>
      )}
      <Button
        onClick={handleOpenDialog}
        className="max-w-14 w-14 h-14 self-end outline-none px-0 py-0 inline-flex items-center justify-center overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 text-white"
      >
        <SwapChildren>
          {widgetSettings && widgetSettings.buttonImage && (
            <img
              className="w-full h-full"
              src={`${assetBaseUrl}${widgetSettings.buttonImage}`}
            />
          )}
          <span className="px-4 py-4">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-7"
            >
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
          </span>
        </SwapChildren>
      </Button>
    </div>
  )
}

export default TriggerButton
