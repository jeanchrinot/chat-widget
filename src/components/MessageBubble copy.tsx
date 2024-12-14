import { format } from "date-fns";

// local imports
import { UserAvatar } from "./Avatar";
import { useSession } from "@/hooks/useSession";

export function MessageBubble({
  content,
  deleted,
  createdAt,
  sender,
}: {
  content: string;
  deleted: boolean;
  createdAt: Date;
  sender: any;
}) {
  const { session } = useSession();
  const isViewer = session.user?.id === sender.id;
  const messageContent = deleted ? "This message has been deleted" : content;

  return (
    <div className="flex my-2">
      {!isViewer && (
        <UserAvatar
          src={
            "https://t3.ftcdn.net/jpg/06/93/16/82/240_F_693168257_5h7lep6mj5wHPcR9AdXurZwf5TORoj5R.jpg"
          }
          alt="bot"
        />
      )}
      <div
        className={`flex flex-col ${isViewer ? "items-end" : "items-start"}`}
      >
        <div
          className={`flex max-w-xs p-2 rounded-xl whitespace-pre-wrap ${
            isViewer
              ? "bg-blue-500 text-white"
              : "bg-primary-200/30 text-black dark:text-white"
          }`}
        >
          <p className="text-sm font-normal text-gray-500 line-clamp-2">
            {messageContent}
          </p>
          <p className="text-xs text-gray-500 self-end font-light whitespace-nowrap">
            {format(new Date(createdAt), "HH:mm a")}
          </p>
        </div>
      </div>
    </div>
  );
}
