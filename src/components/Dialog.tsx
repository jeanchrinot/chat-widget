import { useState, useEffect, useCallback } from "react"

// Local imports
import { Header } from "./Header"
import { MessageForm } from "./MessageForm"
import { useLayout } from "@/hooks/useLayout"
import Messages from "./Messages"
import { useStore } from "@/hooks/useStore"
import type { ParticipantType } from "@prisma/client"
import QuickReplies from "./QuickReplies"

const greetingMessage = {
  id: "67547fc747c22f0528c108eb",
  content:
    "Hey! 👋🏾 I'm Chelsea, your virtual assistant. How can I help you today?",
  attachments: null,
  sessionId: "b39f8a7e-dc34-402d-8d07-31c64c8bd919",
  senderId: "674af8cd4da47e3d26cd66be",
  senderType: "Bot" as ParticipantType,
  conversationId: "67547e7247c22f0528c108d4",
  deleted: false,
  status: "sent",
  createdAt: new Date(),
  updatedAt: new Date(),
}

export function Dialog() {
  // const { session } = useSession()
  const { messages, setMessages, setQuickReplies, widgetSettings } = useStore()
  const { openDialog, setOpenDialog } = useLayout()
  const [expanded, setExpanded] = useState(false)
  const [, setIsScrolled] = useState(false)

  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
    setIsScrolled(false)
  }, [])

  useEffect(() => {
    if (!messages.length && widgetSettings?.greetingMessage) {
      const greetingMsg = {
        ...greetingMessage,
        content: widgetSettings.greetingMessage,
      }
      setMessages([greetingMsg])
    }
    // if (messages.length <= 1) {
    //   setQuickReplies(quickReplies)
    // }
  }, [setMessages, setQuickReplies, messages, widgetSettings])

  const onClose = () => {
    setOpenDialog(false)
  }

  let DialogContent = null

  if (!openDialog) return null

  DialogContent = (
    <>
      <Messages />
      <QuickReplies />
      <MessageForm />
    </>
  )

  return (
    <div
      className={`fixed rounded-xl flex flex-col border border-border text-black dark:text-white m-4 right-0 bottom-0 max-w-full overflow-hidden transition-all shadow-3xl ${
        expanded ? "left-0 top-0 z-50" : "w-full sm:max-w-xs top-5"
      } ${!openDialog ? "hidden" : ""}`}
    >
      <Header
        expanded={expanded}
        onClear={() => {}}
        onExpand={handleExpand}
        onClose={onClose}
      />

      {DialogContent}
    </div>
  )
}
