import { useStore } from "@/hooks/useStore"
import React from "react"

interface IconButtonProps {
  onClick: () => void
  children: React.ReactNode
  ariaLabel?: string
}

export function IconButton({ onClick, children, ariaLabel }: IconButtonProps) {
  const { widgetSettings } = useStore()
  return (
    <button
      onClick={onClick}
      className={`max-h-7 cursor-pointer ${widgetSettings?.themeColor?.text} border-none bg-transparent py-1 px-1 rounded-lg hover:text-neutral-500 dark:hover:text-neutral-300`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
