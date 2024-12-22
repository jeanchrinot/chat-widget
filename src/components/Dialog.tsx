import { useState, useEffect, useRef, useCallback } from "react"

// Local imports
import { Header } from "./Header"
import { MessageForm } from "./MessageForm"
import { useLayout } from "@/hooks/useLayout"
import Messages from "./Messages"
import { useStore } from "@/hooks/useStore"
import { ParticipantType } from "@prisma/client"
import QuickReplies from "./QuickReplies"

interface DialogProps {
  infoMessage: React.ReactNode
  isOpen: boolean
  name: string
  welcomeMessage: string
  onClose: () => void
}
const greetingMessage = {
  id: "67547fc747c22f0528c108eb",
  content:
    "Hey! 👋🏾 I'm Chelsea, your virtual assistant. How can I help you today?",
  attachments: null,
  sessionId: "b39f8a7e-dc34-402d-8d07-31c64c8bd919",
  senderId: "674af8cd4da47e3d26cd66be",
  senderType: ParticipantType.Bot,
  conversationId: "67547e7247c22f0528c108d4",
  deleted: false,
  status: "sent",
  createdAt: "2024-12-07T17:03:03.293Z",
  updatedAt: "2024-12-07T17:03:03.293Z",
}

const defaultMessages = [greetingMessage]

const quickReplies = [
  "I want to get a free e-book.",
  "I would like to get a free quote for a website design.",
]

export function Dialog() {
  // const { session } = useSession()
  const { messages, setMessages, setQuickReplies, widgetSettings } = useStore()
  const { openDialog, setOpenDialog } = useLayout()
  const [expanded, setExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // const listRef = useRef<HTMLDivElement>(null)
  // const { currentConversationId, setCurrentConversationId, setConversations } =
  //   useZustandStore()

  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
    setIsScrolled(false)
  }, [])

  // console.log("Session", session)
  // const fetchConversations = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_NEXT_AUTH_API_URL}/api/conversations`,
  //       {
  //         params: { conversationId: session?.user?.id },
  //         withCredentials: true,
  //       }
  //     )
  //     console.log(data)
  //     return data
  //   } catch (err) {
  //     console.log(err)
  //     return []
  //   }
  // }

  // const {
  //   data: conversations,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["conversations", session?.user?.id],
  //   queryFn: async () => {
  //     const data = await fetchConversations()
  //     setConversations(data)
  //     if (data.length > 0 && !currentConversationId) {
  //       setCurrentConversationId(data[0].id)
  //     }
  //     return data
  //   },
  //   enabled: !!session?.user?.id,
  // })

  // useEffect(() => {
  //   if (!isScrolled && listRef.current) {
  //     listRef.current.scrollTo({
  //       top: listRef.current.scrollHeight,
  //       behavior: "smooth",
  //     })
  //   }
  // }, [isScrolled, conversations])

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

  // if (!userToken || conversation?.status === "Closed")
  //   DialogContent = <Starter />
  // else
  //   DialogContent = (
  //     <>
  //       <Messages />
  //       <QuickReplies />
  //       <MessageForm />
  //     </>
  //   )

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
      }`}
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
