import { createId } from "@paralleldrive/cuid2"
import { ParticipantType } from "@prisma/client"

export const createObjectId = () => {
  return createId()
}

export const createUserMessage = ({
  text,
  sessionId,
}: {
  text: string | null
  sessionId: string | null
}) => {
  const userMessage = {
    id: createObjectId(),
    content: text,
    attachments: null,
    sessionId,
    senderId: null,
    senderType: ParticipantType.User,
    conversationId: null,
    deleted: false,
    status: "sending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return userMessage
}
