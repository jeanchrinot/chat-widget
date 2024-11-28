import { useState } from "react";

// local imports
import { UserAvatar } from "./Avatar";
import { Separator } from "./ui/separator";
import { useSession } from "@/hooks/useSession";
import { groupMessagesByDate } from "@/lib/utils";
import { useZustandStore } from "@/hooks/useZustandStore";

export const MenuDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { conversations, setCurrentConversationId } = useZustandStore();

  const { session } = useSession();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleOnClick = ({ id }: { id: string }) => {
    setCurrentConversationId(id);
    setIsOpen(false);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const groupedMessages = groupMessagesByDate(conversations);

  return (
    <div className="">
      <button
        onClick={toggleDrawer}
        className="cursor-pointer text-gray-500 border-none py-1 px-1.5 rounded-lg hover:text-neutral-500 dark:hover:text-neutral-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          color={"#000000"}
          fill={"none"}
        >
          <path
            d="M4 5L16 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 19L12 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute h-full w-full inset-0 bg-black bg-opacity-60 z-30"
          onClick={closeDrawer}
          aria-hidden="true"
        ></div>
      )}
      <div
        className={`absolute top-0 rounded-lg left-0 z-40 pt-0.5 h-full overflow-y-auto w-5/6 dark:bg-gray-800 bg-white border-r-[1px] border-gray-100  transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" px-4 py-2 bg-slate-50 w-full flex justify-between items-center border-b border-slate-200">
          <UserAvatar src={session?.user?.image} alt="user avatar" />
          <button
            type="button"
            onClick={closeDrawer}
            className="text-gray-400 p-1.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-controls="drawer-example"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div className="px-4 py-2 flex items-center justify-between">
          <p className="text-gray-500 text-sm ">New conversation</p>
          <button className="text-gray-500 bg-slate-50 p-1.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"currentColor"}
              fill={"none"}
              className="hover:text-gray-800"
            >
              <path
                d="M21.9165 10.5001C21.9351 10.6557 21.9495 10.8127 21.9598 10.9708C22.0134 11.801 22.0134 12.6608 21.9598 13.491C21.6856 17.7333 18.3536 21.1126 14.1706 21.3906C12.7435 21.4855 11.2536 21.4853 9.82937 21.3906C9.33893 21.358 8.80437 21.241 8.34398 21.0514C7.83174 20.8404 7.57557 20.7349 7.44541 20.7509C7.31524 20.7669 7.12637 20.9062 6.74865 21.1847C6.08265 21.6758 5.24364 22.0286 3.9994 21.9983C3.37023 21.983 3.05565 21.9753 2.91481 21.7352C2.77398 21.4951 2.94938 21.1627 3.30018 20.4979C3.78671 19.5759 4.09498 18.5204 3.62788 17.6747C2.8234 16.4667 2.14007 15.0361 2.04021 13.491C1.98656 12.6608 1.98656 11.801 2.04021 10.9708C2.31438 6.7285 5.64636 3.34925 9.82937 3.07119C11.0318 2.99126 12.2812 2.97868 13.5 3.0338"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.49997 15.0001H15.5M8.49997 10.0001H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.8683 2.43946L21.5607 3.13183C22.1465 3.71761 22.1465 4.66736 21.5607 5.25315L17.9333 8.94881C17.6479 9.23416 17.2829 9.42652 16.8863 9.50061L14.6381 9.98865C14.2832 10.0657 13.9671 9.75054 14.0431 9.39537L14.5216 7.16005C14.5957 6.76336 14.7881 6.39836 15.0734 6.11301L18.747 2.43946C19.3328 1.85368 20.2825 1.85368 20.8683 2.43946Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="px-4 overflow-y-auto">
            <Separator className="mx-auto px-4 w-full mb-3 mt-1 bg-slate-200 " />
            <h4 className="py-2 text-gray-600 text-xs font-medium">{date}</h4>
            {groupedMessages[date].map((message) => (
              <button
                key={message.id}
                onClick={() => handleOnClick({ id: message.id })}
                className="p-2 bg-slate-100 rounded-lg cursor-pointer"
              >
                <p className="truncate text-sm text-gray-500">
                  {message.content}
                </p>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
