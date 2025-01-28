import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { assetBaseUrl, defaultAvatar } from "@/lib/api-client"
import { useStore } from "@/hooks/useStore"

export function HeaderAvatar() {
  const { widgetSettings, agent } = useStore()
  return (
    <Avatar className={`w-10 h-10 text-white overflow-hidden`}>
      <AvatarImage
        src={`${assetBaseUrl}${agent?.image || (agent?.agentType == "Bot" ? defaultAvatar : "")}`}
        alt="Avatar"
        className={`border border-${widgetSettings?.themeColor?.mainColor} overflow-hidden`}
      />
      <AvatarFallback
        className={`${widgetSettings?.themeColor?.bg} border font-bold`}
      >
        {agent?.name?.slice(0, 1)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
