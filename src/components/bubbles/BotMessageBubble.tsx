import { format } from "date-fns"

// local imports
import { UserAvatar } from "../Avatar"
// import { useSession } from "@/hooks/useSession";
import type { Message } from "@prisma/client"
import { useStore } from "@/hooks/useStore"
import { assetBaseUrl, defaultAvatar } from "@/lib/api-client"

export function BotMessageBubble({
  message,
}: {
  message: Message
}): JSX.Element {
  const { widgetSettings } = useStore()
  return (
    <div className="flex my-2 space-x-2">
      <UserAvatar
        src={`${assetBaseUrl}${widgetSettings?.avatar || defaultAvatar}`}
        alt="bot"
        name="Bot"
        customClass="w-8 h-8"
      />
      <div className={`flex flex-col items-start`}>
        <div
          className={`relative flex max-w-xs whitespace-pre-wrap bg-slate-200 py-2 px-2 rounded-b-2xl rounded-tr-2xl mr-9`}
        >
          <p className="text-xs font-normal text-gray-700 mb-2">
            {message?.content}
          </p>
          <p
            className="text-xs text-slate-500 self-end font-light whitespace-nowrap absolute right-4 bottom-0"
            style={{ fontSize: "9px" }}
          >
            {format(new Date(message?.createdAt), "HH:mm a")}
          </p>
        </div>
      </div>
    </div>
  )
}
