import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { ForwardRefRenderFunction, forwardRef, PropsWithoutRef } from "react"
import { TConversation } from "@/hooks/useZustandStore"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// forward refs
export function fr<T = HTMLElement, P = React.HTMLAttributes<T>>(
  component: ForwardRefRenderFunction<T, PropsWithoutRef<P>>
) {
  const wrapped = forwardRef(component)
  wrapped.displayName = component.name
  return wrapped
}

// styled element
export function se<
  T = HTMLElement,
  P extends React.HTMLAttributes<T> = React.HTMLAttributes<T>,
>(Tag: keyof React.ReactHTML, ...classNames: ClassValue[]) {
  const component = fr<T, P>(({ className, ...props }, ref) => (
    // @ts-expect-error Too complicated for TypeScript
    <Tag ref={ref} className={cn(...classNames, className)} {...props} />
  ))
  component.displayName = Tag[0].toUpperCase() + Tag.slice(1)
  return component
}

export const formatDate = (date: Date) => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday = date.toDateString() === today.toDateString()
  const isYesterday = date.toDateString() === yesterday.toDateString()

  if (isToday) return "Today"
  if (isYesterday) return "Yesterday"
  return date.toLocaleDateString()
}

export const groupMessagesByDate = (conversations: TConversation[]) => {
  const grouped: { [key: string]: TConversation["messages"] } = {}

  conversations.forEach((conversation) => {
    conversation.messages.forEach((message) => {
      const date = new Date(message.createdAt)
      const dateStr = formatDate(date)
      if (!grouped[dateStr]) {
        grouped[dateStr] = []
      }
      grouped[dateStr].push(message)
    })
  })

  return grouped
}
