import React from "react"

interface IconButtonProps {
  onClick: () => void
  children: React.ReactNode
  ariaLabel?: string
}

export function IconButton({ onClick, children, ariaLabel }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="max-h-7 cursor-pointer text-white border-none bg-transparent py-1 px-1 rounded-lg hover:text-neutral-500 dark:hover:text-neutral-300"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
