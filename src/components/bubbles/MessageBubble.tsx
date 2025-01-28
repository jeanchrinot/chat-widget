// local imports
import type { Message, ParticipantType } from "@prisma/client"
import { UserMessageBubble } from "./UserMessageBubble"
import { BotMessageBubble } from "./BotMessageBubble"
import { AgentMessageBubble } from "./AgentMessageBubble"

export function MessageBubble({ message }: { message: Message }) {
  if (message?.senderType === ("Bot" as ParticipantType)) {
    return <BotMessageBubble message={message} />
  } else if (message?.senderType === ("User" as ParticipantType)) {
    return <UserMessageBubble message={message} />
  } else if (message?.senderType === ("Agent" as ParticipantType)) {
    return <AgentMessageBubble message={message} />
  }
  return <></>
}
