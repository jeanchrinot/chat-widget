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
import { useEffect, useState } from "react"
const TriggerButton = () => {
  const { setOpenDialog, openDialog } = useLayout()
  const [channelId, setChannelId] = useState<string | null>(null)

  const {
    userToken,
    widgetSettings,
    setUserToken,
    setUser,
    setBotSettings,
    setWidgetSettings,
    setConversation,
    setTransfer,
    setSessionId,
    setAgent,
    setBotAgent,
    setTestKey,
  } = useStore()

  const { mutate: initiateChat, isPending: isInitiateChatPending } =
    useInitiateChatWidget()
  const { mutate: getChatWidget, isPending: isWidgetDataPending } =
    useGetWidgetSettings()

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  /**
   * Get Channel Id from the chat widget script
   * once the document is loaded
   */

  useEffect(() => {
    // First get channel from url
    // Get the current host and path
    let channelId = null

    const { hostname, pathname } = window.location
    console.log("hostname", hostname)

    // Define the expected domain
    const expectedDomain = process.env.VITE_NEXT_WEBSITE_DOMAIN!
    console.log("expectedDomain", expectedDomain)

    // Check if the hostname matches the expected domain
    if (hostname === expectedDomain) {
      // Extract the channelId from the URL path
      const pathSegments = pathname.split("/") // Split the path into segments
      channelId = pathSegments.length > 2 ? pathSegments[2] : null // Assuming the structure is /chat/[channelId]

      if (channelId) {
        console.log("Channel ID:", channelId)
        // Check for test
        // Get the current URL's query parameters
        const searchParams = new URLSearchParams(window.location.search)

        // Check if the "test" parameter exists
        const testParam = searchParams.get("test_key")
        if (testParam) {
          console.log('The "test" parameter exists.')
          setTestKey(testParam)
        } else {
          console.log('The "test" parameter does not exist')
        }
      } else {
        console.error("Channel ID not found in the URL path.")
      }
    } else {
      console.log(`Host does not match the expected domain: ${expectedDomain}`)
      // Access the script element
      const scriptElement = document.querySelector<HTMLScriptElement>(
        "script[chat-widget-channel-id]"
      )

      if (scriptElement) {
        // Retrieve the chat-widget-channel-id attribute
        channelId = scriptElement.getAttribute("chat-widget-channel-id")
        console.log("Channel ID:", channelId)
        if (!channelId) {
          // Get Id
          console.error("Channel ID attribute not found on the script element.")
        }
      } else {
        console.error("Script element with widget-id not found.")
      }
    }

    if (!channelId) {
      // Get the port number from the current URL
      const port = window.location.port || "5173"
      console.log("port", port)
      if (port == "5173") {
        // Use Demo Channel Id By Default
        channelId = process.env.VITE_NEXT_DEMO_CHANNEL_ID! || null
        console.log("Demo channelId", channelId)
      } else {
        console.error("No port number found in the URL.")
      }
    }

    setChannelId(channelId)
  }, []) // Run once on component mount

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

  if (isInitiateChatPending || isWidgetDataPending) return <></>

  return (
    <div
      className={`absolute bottom-5 right-5 flex flex-col items-end space-y-2 ${!userToken || openDialog ? "hidden" : ""}`}
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
        className={`max-w-14 w-14 h-14 self-end outline-none px-0 py-0 inline-flex items-center justify-center overflow-hidden text-sm font-medium rounded-full group ${widgetSettings?.themeColor?.bg} ${widgetSettings?.themeColor?.text}`}
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
