import React, {
  ElementRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { Account, User } from "@prisma/client";

//  local imports
import { MessageBubble } from "./MessageBubble";
import { useChatQuery } from "@/hooks/useQuery";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useChatScroll } from "@/hooks/useChatScroll";
import { MessagesSkeleton } from "./skeletons/MesagesSkeleton";

interface MessageListProps {
  chatId: string;
  apiUrl: string;
  paramKey: "conversationId";
  paramValue: string;
  listRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}

type Message = {
  id: string;
  content: string;
  fileUrl?: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: string;
  sender: Account & { user: User };
};

export function MessageList({
  chatId,
  apiUrl,
  paramKey,
  paramValue,
  listRef,
  onScroll,
}: MessageListProps) {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({ queryKey, addKey, updateKey });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: async () => {
      setIsLoadingMore(true);
      const previousScrollHeight = chatRef.current?.scrollHeight ?? 0;
      await fetchNextPage();
      setIsLoadingMore(false);
      if (chatRef.current) {
        // Maintain scroll position after loading more messages
        chatRef.current.scrollTop =
          chatRef.current.scrollHeight - previousScrollHeight;
      }
    },
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.flatMap((page) => page.items).length ?? 0,
  });

  useEffect(() => {
    const topDiv = chatRef.current;

    const shouldAutoScroll = () => {
      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll() && !isLoadingMore) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [data, isLoadingMore]);

  if (status === "pending") {
    return (
      <div className="relative h-full bg-white flex-grow overflow-auto gap-2 flex flex-col px-4 scrollbar-sm">
        <MessagesSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div
      className="relative h-full bg-white flex-grow overflow-auto gap-2 flex flex-col px-4 scrollbar-sm"
      ref={listRef}
      onScroll={onScroll}
    >
      <div ref={chatRef} className="pt-4">
        {data?.pages?.map((page, i) => (
          <Fragment key={i}>
            {page?.items.map((message: Message) => {
              const sender = message?.sender;
              return (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  deleted={message.deleted}
                  createdAt={message.createdAt}
                  sender={sender}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
