// import { useSendMessage } from "@/hooks/useChatQuery"
import { useLayout } from "@/hooks/useLayout"
import { useStore } from "@/hooks/useStore"
// import { createUserMessage } from "@/lib/func"
// import { useEffect } from "react"

export function QuickReply({ text }: { text: string }) {
  const { mainBgClassName, mainBgTextColorClassName } = useLayout()
  const { setSelectedQuickReply, setQuickReplies } = useStore()

  const handleQuickReply = () => {
    //Create a user message
    setSelectedQuickReply(text)
    setQuickReplies([])
  }

  return (
    <div
      className="flex my-1 cursor-pointer justify-end items-end"
      onClick={handleQuickReply}
    >
      <div
        className={`flex max-w-xs whitespace-pre-wrap ${mainBgClassName} py-2 px-3 rounded-2xl`}
      >
        <p className={`text-xs font-normal ${mainBgTextColorClassName}`}>
          {text}
        </p>
      </div>
    </div>
  )
}
