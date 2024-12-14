import { useStore } from "@/hooks/useStore"
import { Fragment } from "react"
import { QuickReply } from "./bubbles/QuickReply"

const QuickReplies = () => {
  const { quickReplies, sessionId } = useStore()

  if (quickReplies?.length == 0) return <></>

  return (
    <div className="absolute bg-white flex-grow overflow-auto gap-2 flex flex-col px-4 scrollbar-sm bottom-14 mb-3">
      <div className="pt-4 flex flex-col justify-end items-end">
        {!sessionId ? (
          <p className="text-xs text-center mb-4">
            By continuing this chat, you agree to our{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              terms and conditions
            </a>{" "}
            and our{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              privacy policy
            </a>
            .
          </p>
        ) : (
          ""
        )}
        {quickReplies?.map((text, index) => {
          return (
            <Fragment key={index}>
              <QuickReply text={text} />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default QuickReplies
