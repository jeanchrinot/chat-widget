import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLayout } from "@/hooks/useLayout"
import { useStore } from "@/hooks/useStore"

interface AvatarProps {
  src: string
  alt: string
  name: string
  customClass: string
}
export function UserAvatar({ src, alt, name, customClass }: AvatarProps) {
  const { widgetSettings } = useStore()
  return (
    <Avatar className={`w-10 h-10 text-white overflow-hidden ${customClass}`}>
      <AvatarImage
        src={src}
        alt={alt}
        className={`border border-${widgetSettings?.themeColor?.mainColor} overflow-hidden`}
      />
      <AvatarFallback
        className={`${widgetSettings?.themeColor?.bg} border font-bold`}
      >
        {name?.slice(0, 1)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
