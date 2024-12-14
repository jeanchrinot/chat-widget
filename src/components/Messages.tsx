import { useStore } from "@/hooks/useStore"
import { ElementRef, Fragment, useEffect, useRef } from "react"
import { MessageBubble } from "./bubbles/MessageBubble"

const Messages = () => {
  const { messages, conversation } = useStore()
  const chatRef = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    if (chatRef.current) {
      // const isAtBottom =
      //   chatRef.current.scrollTop + chatRef.current.clientHeight >=
      //   chatRef.current.scrollHeight - 10 // Allow a small tolerance

      // // Automatically scroll to bottom only if the user is already at the bottom
      // if (isAtBottom) {
      //   chatRef.current.scrollTop = chatRef.current.scrollHeight
      // }
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      className="relative h-full bg-white flex-grow overflow-auto gap-2 flex flex-col px-4 scrollbar-sm"
      ref={chatRef}
    >
      <div className="pt-4">
        {messages?.map((message, index) => {
          return (
            <Fragment key={index}>
              <MessageBubble message={message} />
            </Fragment>
          )
        })}
      </div>
      <div>
        {conversation?.status === "Closed" ? (
          <p className="text-sm text-center text-pink-500 italic mb-4">
            This chat session has ended.
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Messages
