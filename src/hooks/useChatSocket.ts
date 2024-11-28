import { useEffect } from "react";
import { Message, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../lib/socket-provider";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithUser = Message & {
  user: User;
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    // Handle message updates (e.g., edited messages)
    socket.on(updateKey, (message: MessageWithUser) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithUser) => {
              if (item.id === message.id) {
                return message; // Replace the message with the updated one
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    // Handle new message additions
    socket.on(addKey, (message: MessageWithUser) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        // Deduplicate: Check if the message already exists in the UI (optimistic update)
        if (
          newData[0].items.some(
            (item: MessageWithUser) => item.id === message.id
          )
        ) {
          return oldData; // If it exists, do not add again
        }

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
