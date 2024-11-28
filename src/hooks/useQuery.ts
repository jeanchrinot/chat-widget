import axios from "axios";
import qs from "query-string";
import { useSocket } from "@/lib/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    try {
      const url = qs.stringifyUrl(
        {
          url: apiUrl,
          query: {
            cursor: pageParam,
            [paramKey]: paramValue,
          },
        },
        { skipNull: true }
      );

      const res = await axios.get(url, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
      initialPageParam: undefined,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
