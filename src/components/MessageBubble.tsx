import { format } from "date-fns"

// local imports
import { UserAvatar } from "./Avatar"
// import { useSession } from "@/hooks/useSession";
import { PrismaClient, Message } from "@prisma/client"

export function MessageBubble({ message }: { message: Message }) {
  return (
    <div className="flex my-2">
      <UserAvatar
        src={
          "https://t3.ftcdn.net/jpg/06/93/16/82/240_F_693168257_5h7lep6mj5wHPcR9AdXurZwf5TORoj5R.jpg"
        }
        alt="bot"
      />
      <div className={`flex flex-col items-end`}>
        <div
          className={`flex max-w-xs p-2 rounded-xl whitespace-pre-wrap bg-blue-500 text-white`}
        >
          <p className="text-sm font-normal text-gray-500 line-clamp-2">
            {message?.content}
          </p>
          <p className="text-xs text-gray-500 self-end font-light whitespace-nowrap">
            {format(new Date(message?.createdAt), "HH:mm a")}
          </p>
        </div>
      </div>
    </div>
  )
}
