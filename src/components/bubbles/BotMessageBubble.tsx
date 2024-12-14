import { format } from "date-fns"

// local imports
import { UserAvatar } from "../Avatar"
// import { useSession } from "@/hooks/useSession";
import { Message } from "@prisma/client"

export function BotMessageBubble({
  message,
}: {
  message: Message
}): JSX.Element {
  return (
    <div className="flex my-2 space-x-2">
      <UserAvatar
        src={
          "https://t3.ftcdn.net/jpg/06/93/16/82/240_F_693168257_5h7lep6mj5wHPcR9AdXurZwf5TORoj5R.jpg"
        }
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
