// import { useInitiateChatWidget } from "@/hooks/useChatQuery"
import { useLayout } from "@/hooks/useLayout"
import { useStore } from "@/hooks/useStore"
import { Button } from "./ui/button"

const Starter = () => {
  const { mainBgClassName, mainBgTextColorClassName } = useLayout()
  const { conversation, userToken } = useStore()
  // const { mutate: initiateChat } = useInitiateChatWidget()

  const handleStartChat = () => {
    // if (channelId) {
    //   initiateChat(
    //     { channelId },
    //     {
    //       onSuccess: (data) => {
    //         console.log("Chat initiated:", data)
    //         setUserToken(data.token)
    //       },
    //       onError: (error) => {
    //         console.error("Error initiating chat:", error)
    //       },
    //     }
    //   )
    // }
  }

  let starterText = null
  if (userToken) {
    if (conversation?.status === "Closed") {
      starterText = (
        <p className="text-sm text-center mb-4">
          This chat session has ended. Start a new chat session to continue.
        </p>
      )
    }
  } else {
    starterText = (
      <p className="text-sm text-center mb-4">
        Welcome! By starting this chat, you agree to our{" "}
        <a
          href="/terms-and-conditions"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          terms and conditions
        </a>{" "}
        and our{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          privacy policy
        </a>
        .
      </p>
    )
  }

  return (
    <div className="relative h-full bg-white flex-grow overflow-auto gap-2 flex flex-col px-4">
      <div className="pt-4 h-full flex flex-col items-center justify-center">
        {starterText}

        <Button
          onClick={handleStartChat}
          className={`${mainBgClassName} ${mainBgTextColorClassName} text-sm`}
        >
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
            className="w-4 h-4 mr-2"
          >
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
          </svg>
          Start Chat
        </Button>
      </div>
    </div>
  )
}

export default Starter
