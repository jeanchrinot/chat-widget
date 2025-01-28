import { format } from "date-fns"

// local imports
import { Message } from "@prisma/client"
import { useStore } from "@/hooks/useStore"

export function UserMessageBubble({ message }: { message: Message }) {
  const { widgetSettings } = useStore()

  return (
    <div className="flex w-full my-2">
      <div className={`flex w-full flex-col items-end`}>
        <div
          className={`relative flex min-w-16 max-w-xs whitespace-pre-wrap ${widgetSettings?.themeColor?.bg} ${widgetSettings?.themeColor?.text} py-2 px-2 rounded-t-2xl rounded-bl-2xl`}
        >
          <p
            className={`text-xs font-normal ${widgetSettings?.themeColor?.text} mb-2`}
          >
            {message?.content}
          </p>
          <p
            className={`text-xs text-gray-500 self-end font-light whitespace-nowrap absolute right-2 bottom-0 ${widgetSettings?.themeColor?.text}`}
            style={{ fontSize: "9px" }}
          >
            {message?.status == "sending"
              ? "sending..."
              : format(new Date(message?.createdAt), "HH:mm a")}
          </p>
        </div>
      </div>
    </div>
  )
}
