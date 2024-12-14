import { Button } from "@/components/ui/button"
import { useInitiateChatWidget } from "@/hooks/useChatQuery"
import { useLayout } from "@/hooks/useLayout"
import { useStore } from "@/hooks/useStore"
import { useSocket } from "@/lib/socket-provider"
import { useEffect } from "react"
const TriggerButton = () => {
  const { setOpenDialog } = useLayout()
  const { socket, isConnected } = useSocket()

  const { channelId, userToken, setUserToken } = useStore()

  const { mutate: initiateChat, data: chatData } = useInitiateChatWidget()
  // const { mutate: sendMessage } = useSendMessage();

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  console.log("userToken", userToken)

  useEffect(() => {
    console.log("socket", socket)
    console.log("isConnected", isConnected)
  }, [socket, isConnected])

  useEffect(() => {
    if (channelId && !userToken) {
      initiateChat(
        { channelId },
        {
          onSuccess: (data) => {
            console.log("Chat initiated:", data)
            setUserToken(data.token)
          },
          onError: (error) => {
            console.error("Error initiating chat:", error)
          },
        }
      )
    }
  }, [initiateChat, channelId])

  return (
    <div
      className={`absolute bottom-5 right-5 flex flex-col items-end space-y-2 ${userToken ? "" : "hidden"}`}
    >
      <div
        onClick={handleOpenDialog}
        className="max-w-80 self-end bg-slate-200 py-2 px-3 rounded-t-2xl rounded-bl-2xl mr-9"
      >
        <span className="w-full text-sm text-gray-500">
          Hey! 👋🏾 I'm Chelsea, your virtual assistant. How can I help you today?
        </span>
      </div>
      <Button
        onClick={handleOpenDialog}
        className="max-w-14 w-14 h-14 self-end outline-none px-4 py-4 inline-flex items-center justify-center overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 text-white"
      >
        <span>
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
      </Button>
    </div>
  )
}

export default TriggerButton
