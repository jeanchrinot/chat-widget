// local imports
import { Message, ParticipantType } from "@prisma/client"
import { UserMessageBubble } from "./UserMessageBubble"
import { BotMessageBubble } from "./BotMessageBubble"
import { AgentMessageBubble } from "./AgentMessageBubble"

export function MessageBubble({ message }: { message: Message }) {
  if (message?.senderType === ParticipantType.Bot) {
    return <BotMessageBubble message={message} />
  } else if (message?.senderType === ParticipantType.User) {
    return <UserMessageBubble message={message} />
  } else if (message?.senderType === ParticipantType.Agent) {
    return <AgentMessageBubble message={message} />
  }
  return <></>
}
