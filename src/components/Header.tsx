import { useStore } from "@/hooks/useStore"
import { assetBaseUrl, defaultAvatar } from "@/lib/api-client"
import { Minus } from "lucide-react"
import { UserAvatar } from "./Avatar"

// Local imports
// import { MenuDrawer } from "./Drawer"
import { IconButton } from "./IconButton"

interface HeaderProps {
  expanded: boolean
  onClear: () => void
  onExpand: () => void
  onClose: () => void
}

export function Header({ onExpand, expanded, onClose }: HeaderProps) {
  // const { mainBgClassName } = useLayout()
  const { widgetSettings, botSettings, agent } = useStore()

  console.log("agent", agent)
  return (
    <div
      className={`flex ${widgetSettings?.themeColor?.bg} ${widgetSettings?.themeColor?.text} justify-between px-2 py-2 space-x-2 `}
    >
      {/* <MenuDrawer /> */}
      <div className="flex flex-row">
        <div className="relative">
          <UserAvatar
            src={`${assetBaseUrl}${agent?.image || (agent?.agentType == "Bot" ? defaultAvatar : "")}`}
            alt="Avatar"
            name={agent?.name || "Agent"}
            customClass="w-10 h-10"
          />
          <span
            className="flex w-2 h-2 bg-green-500 rounded-full absolute"
            style={{ bottom: "4px", right: "4px" }}
          ></span>
        </div>
        <div className="flex flex-col ml-3 justify-center">
          <span className="text-sm font-bold" style={{ marginTop: "10px" }}>
            {agent?.name || "AI Bot"}
          </span>
          <span
            className={`text-xs ${widgetSettings?.themeColor?.text}`}
            style={{ marginTop: "-3px" }}
          >
            {widgetSettings?.onlineStatus || "online"}
          </span>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-1">
        <IconButton onClick={onClose}>
          <Minus className="h-5 w-5 cursor-pointer" />
        </IconButton>
        <IconButton onClick={onExpand}>
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          )}
        </IconButton>
        <IconButton onClick={() => {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  )
}
