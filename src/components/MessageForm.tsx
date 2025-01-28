import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Local imports
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { EmojiPicker } from "./Emoji"
import { useInitiateChatWidget, useSendMessage } from "@/hooks/useChatQuery"
import { useEffect } from "react"
import { createUserMessage } from "@/lib/func"
import { useStore } from "@/hooks/useStore"
import { useSocket } from "@/lib/socket-provider"

export function MessageForm() {
  const {
    channelId,
    sessionId,
    setSessionId,
    user,
    setUser,
    botAgent,
    setAgent,
    userToken,
    setUserToken,
    conversation,
    transfer,
    setConversation,
    setTransfer,
    messages,
    setMessages,
    selectedQuickReply,
    setSelectedQuickReply,
    setQuickReplies,
    widgetSettings,
    startNewSession,
    setStartNewSession,
    testKey,
  } = useStore()

  const { mutate: initiateChat } = useInitiateChatWidget()

  const {
    mutate: sendMessage,
    data: responseData,
    error: messageError,
    isPending: isSending,
  } = useSendMessage()

  const { socket, isConnected } = useSocket()

  console.log("isConnected", isConnected)

  useEffect(() => {
    if (socket && conversation && user && transfer) {
      if (transfer.status == "Pending" || transfer.status == "Active") {
        // Join the chat room
        socket.emit("joinRoom", {
          roomId: conversation.id,
          userId: user.id,
          userType: "User",
        })

        // Receive a message
        const handleAgentJoined = (data: any) => {
          console.log("Agent:", data.agent)
          if (data.agent) {
            setAgent(data.agent)
          }
        }

        socket.on("agentJoined", handleAgentJoined)

        // Receive a message
        const handleMessage = (data: any) => {
          console.log("New message:", data.message)
          setMessages([...messages, data.message])
          if (conversation.status == "Pending") {
            setConversation({ ...conversation, status: "Active" })
          }
        }

        socket.on("receiveMessage", handleMessage)

        // Disconnect chat
        const handleChatClosed = () => {
          setConversation({ ...conversation, status: "Closed" })
          setTransfer({ ...transfer, status: "Closed" })
          //Update Agent Info
          if (botAgent) {
            setAgent(botAgent)
          }
          console.log("conv set...")
        }

        socket.on("chatClosed", handleChatClosed)

        // Cleanup function to prevent duplication
        return () => {
          socket.off("receiveMessage", handleMessage)
          socket.off("chatClosed", handleChatClosed)
        }
      }
    }
  }, [socket, messages, setMessages, conversation, user, transfer, botAgent])

  console.log("transfer", transfer)

  console.log("agent", botAgent)

  // Resend last unsent message when user token refreshes
  useEffect(() => {
    console.log("user token changed")
    //Resend last message
    if (messages.length && messages.at(-1)?.status === "sending") {
      let messageValue: string | null = null

      if (messages.length) {
        const lastMessage = messages.at(-1)
        if (lastMessage?.content) {
          messageValue = lastMessage.content
        }
      }

      sendMessage(
        { sessionId, message: messageValue, token: userToken, testKey },
        {
          onSuccess: (data) => {
            console.log("Message sent:", data)
          },
          onError: (error) => {
            console.error("Error sending message:", error)
          },
        }
      )
    } else {
      console.log("no message unsent")
    }
  }, [userToken])

  // Update States After Getting Response From Bot
  useEffect(() => {
    console.log("responseData", responseData)

    if (responseData && responseData.response) {
      setConversation(responseData.response.conversation)
      setTransfer(responseData.response.transfer)
      setMessages([
        ...messages.slice(0, -1),
        responseData.response.userMessage,
        responseData.response.message,
      ])
      setSessionId(responseData.response.sessionId)
      setSelectedQuickReply("")
      setQuickReplies([])
      if (responseData.response.conversation.status == "Pending") {
        setStartNewSession(false)
      }
    }
  }, [responseData, setMessages])

  // Message Error Handling
  // Reinitialize chat widget. i.e. Refresh user token
  useEffect(() => {
    const error = messageError as Error & { status?: number }
    if (error?.status === 401) {
      console.log("Refresh token needed.")
      if (channelId) {
        initiateChat(
          { channelId, userId: user?.id || null },
          {
            onSuccess: (data: any) => {
              console.log("Chat Reinitiated:", data)
              setUserToken(data.token)
              setUser(data.user)
            },
            onError: (error: any) => {
              console.error("Error initiating chat:", error)
            },
          }
        )
      } else {
        console.log("This channel is not available.")
      }
    }
  }, [messageError])

  //Handle quick reply
  useEffect(() => {
    if (selectedQuickReply && user && conversation) {
      //Create a user message
      const userMessage = createUserMessage({
        text: selectedQuickReply,
        sessionId: sessionId || "",
        userId: user?.id || "",
        conversationId: conversation?.id,
      })
      setMessages([...messages, userMessage])
      sendMessage(
        {
          sessionId,
          message: selectedQuickReply,
          token: userToken,
          testKey,
        },
        {
          onSuccess: (data) => {
            console.log("Message sent:", data)
          },
          onError: (error) => {
            console.error("Error sending message:", error)
          },
        }
      )
    }
  }, [selectedQuickReply])

  // Message Input Form Validation
  const formSchema = z.object({
    content: z.string().min(2, {
      message: "Please type something",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })

  // Handle Message Input Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      user &&
      ((conversation && conversation.status != "Pending") || !conversation)
    ) {
      try {
        console.log("values", values)
        //Create a user message
        const userMessage = createUserMessage({
          text: values.content,
          sessionId: sessionId || "",
          userId: user?.id || "",
          conversationId: conversation?.id || "",
        })

        if (transfer?.status == "Active" && socket && conversation) {
          console.log("sending message...")
          socket.emit("sendMessage", {
            roomId: conversation.id,
            message: userMessage,
          })
        } else {
          //Empty quick replies
          setQuickReplies([])

          setMessages([...messages, userMessage])
          sendMessage(
            {
              sessionId,
              message: values.content,
              token: userToken,
              testKey,
            },
            {
              onSuccess: (data) => {
                console.log("Message sent:", data)
              },
              onError: (error) => {
                console.error("Error sending message:", error)
              },
            }
          )
        }
        form.reset()
      } catch (e) {
        console.error("Error posting message:", e)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center px-4 pb-2 pt-1 bg-white border-t border-neutral-200"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormMessage className="text-sm font-normal" />

              <FormControl>
                <div className="flex items-center gap-x-3 flex-1 gap-1 relative">
                  <EmojiPicker
                    onChange={(emoji: string) =>
                      field.onChange(`${field.value} ${emoji}`)
                    }
                  />
                  <Input
                    {...field}
                    placeholder="Type something..."
                    disabled={
                      isSending ||
                      (conversation != null &&
                        conversation?.status != "Active" &&
                        !startNewSession)
                    }
                    className="bg-transparent resize-none w-full border border-gray-300 outline-none focus:outline-none focus:border-zinc-400 focus:ring-0 focus:ring-offset-0 rounded-full px-3 flex-1 no-scrollbar"
                  />
                  <div className="flex">
                    <button
                      className={`inline-flex items-center justify-center text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none ${widgetSettings?.themeColor?.bg} ${widgetSettings?.themeColor?.text} rounded-full h-[42px] w-[42px] p-0 self-end`}
                      type="submit"
                      aria-label="Send Message"
                      disabled={
                        isSending ||
                        (conversation != null &&
                          conversation?.status != "Active" &&
                          !startNewSession)
                      }
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
                        className="w-5 h-8 rtl:rotate-180 skew-x-6"
                      >
                        <path d="m3 3 3 9-3 9 19-9Z"></path>
                        <path d="M6 12h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
