import { createId } from "@paralleldrive/cuid2"
import { ParticipantType } from "@prisma/client"

export const createObjectId = () => {
  return createId()
}

export const createUserMessage = ({
  text,
  sessionId,
  userId,
  conversationId,
}: {
  text: string | null
  sessionId: string | null
  userId: string | null
  conversationId: string | null
}) => {
  const userMessage = {
    id: createObjectId(),
    content: text,
    attachments: null,
    sessionId,
    senderId: userId,
    senderType: ParticipantType.User,
    conversationId: conversationId,
    deleted: false,
    status: "sending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return userMessage
}
