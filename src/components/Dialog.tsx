import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useCallback } from "react";

// Local imports
import { Header } from "./Header";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";
import { useSession } from "@/hooks/useSession";
import WelecomeComponent from "./WelecomeComponent";
import { useZustandStore } from "@/hooks/useZustandStore";

interface DialogProps {
  infoMessage: React.ReactNode;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}

export function Dialog({ isOpen, onClose }: DialogProps) {
  const { session } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { currentConversationId, setCurrentConversationId, setConversations } =
    useZustandStore();

  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
    setIsScrolled(false);
  }, []);

  console.log("Session", session);
  const fetchConversations = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_NEXT_AUTH_API_URL}/api/conversations`,
        {
          params: { conversationId: session?.user?.id },
          withCredentials: true,
        }
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["conversations", session?.user?.id],
    queryFn: async () => {
      const data = await fetchConversations();
      setConversations(data);
      if (data.length > 0 && !currentConversationId) {
        setCurrentConversationId(data[0].id);
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (!isScrolled && listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isScrolled, conversations]);

  if (!isOpen) return null;

  console.log(conversations);
  return (
    <div
      className={`fixed rounded-xl flex flex-col text-black dark:text-white m-4 right-0 bottom-0 max-w-full overflow-hidden transition-all shadow-3xl ${
        expanded ? "left-0 top-0 z-50" : "w-full sm:max-w-sm h-5/6"
      }`}
    >
      <Header
        expanded={expanded}
        onClear={() => {}}
        onExpand={handleExpand}
        onClose={onClose}
      />
      {isLoading ? (
        <div className="h-full bg-white">
          <div className="h-full flex items-center justify-center col-sm-6 text-center">
            <div className="loader1">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : conversations?.length > 0 && currentConversationId ? (
        <MessageList
          paramKey="conversationId"
          paramValue={currentConversationId}
          chatId={currentConversationId}
          apiUrl={`${import.meta.env.VITE_NEXT_AUTH_API_URL}/api/assistant-messages`}
          listRef={listRef}
          onScroll={() => setIsScrolled(true)}
        />
      ) : (
        <WelecomeComponent />
      )}
      <MessageForm />
    </div>
  );
}
