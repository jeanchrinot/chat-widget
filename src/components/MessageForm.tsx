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
import { useLayout } from "@/hooks/useLayout"

export function MessageForm() {
  const {
    channelId,
    sessionId,
    setSessionId,
    userToken,
    setUserToken,
    conversation,
    setConversation,
    messages,
    setMessages,
    selectedQuickReply,
    setSelectedQuickReply,
    setQuickReplies,
  } = useStore()

  const { mutate: initiateChat, data: chatData } = useInitiateChatWidget()

  const {
    mutate: sendMessage,
    data: responseData,
    error: messageError,
    isPending: isSending,
  } = useSendMessage()

  const { mainBgClassName, mainBgTextColorClassName } = useLayout()

  // Take some actions after conversation status changes
  // useEffect(()=>{
  //   if(conversation?.status==="Closed"){
  //     //Reset sessionId
  //     setSessionId(null);
  //   }
  // },[conversation])

  // Update States After Getting Response From Bot
  useEffect(() => {
    console.log("responseData", responseData)

    if (responseData && responseData.response) {
      setConversation(responseData.response.conversation)
      setMessages([
        ...messages.slice(0, -1),
        responseData.response.userMessage,
        responseData.response.message,
      ])
      setSessionId(responseData.response.sessionId)
      setSelectedQuickReply("")
      setQuickReplies([])
    }
  }, [responseData, setMessages])

  // Message Error Handling
  // Reinitialize chat widget. i.e. Refresh user token
  useEffect(() => {
    console.log("messageError", messageError?.status)
    if (messageError?.status === 401) {
      console.log("Refresh token needed.")
      if (channelId) {
        initiateChat(
          { channelId },
          {
            onSuccess: (data: any) => {
              console.log("Chat Reinitiated:", data)
              setUserToken(data.token)
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
    if (selectedQuickReply) {
      //Create a user message
      const userMessage = createUserMessage({
        text: selectedQuickReply,
        sessionId,
      })
      setMessages([...messages, userMessage])
      sendMessage(
        { sessionId, message: selectedQuickReply, token: userToken },
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
    try {
      console.log("values", values)
      //Empty quick replies
      setQuickReplies([])
      //Create a user message
      const userMessage = createUserMessage({
        text: values.content,
        sessionId,
      })
      setMessages([...messages, userMessage])
      sendMessage(
        { sessionId, message: values.content, token: userToken },
        {
          onSuccess: (data) => {
            console.log("Message sent:", data)
          },
          onError: (error) => {
            console.error("Error sending message:", error)
          },
        }
      )
      form.reset()
    } catch (e) {
      console.error("Error posting message:", e)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center px-4 pb-2 pt-1 bg-white border-t border-neutral-200 dark:border-neutral-800"
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
                    disabled={isSending}
                    className="bg-transparent resize-none w-full border border-gray-300 outline-none focus:outline-none focus:border-zinc-400 focus:ring-0 focus:ring-offset-0 rounded-full px-3 flex-1 no-scrollbar"
                  />
                  <div className="flex">
                    <button
                      className={`inline-flex items-center justify-center text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none ${mainBgClassName} ${mainBgTextColorClassName} rounded-full h-[42px] w-[42px] p-0 self-end`}
                      type="submit"
                      aria-label="Send Message"
                      disabled={form.formState.isLoading}
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
