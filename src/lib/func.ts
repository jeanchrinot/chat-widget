import { createId } from "@paralleldrive/cuid2"
import type { ParticipantType } from "@prisma/client"

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
  sessionId: string
  userId: string
  conversationId: string
}) => {
  const userMessage = {
    id: createObjectId(),
    content: text,
    attachments: null,
    sessionId,
    senderId: userId,
    senderType: "User" as ParticipantType,
    conversationId: conversationId,
    deleted: false,
    status: "sending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return userMessage
}
