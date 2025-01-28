// import { createPortal } from "react-dom"

// local imports
// import { AiXFlowsChatDialog } from "@/components/AixFLowsChatDialog";
import { Dialog } from "@/components/Dialog"
// import { useLayout } from "@/hooks/useLayout"
import TriggerButton from "./TriggerButton"

export function AixFLowsChat() {
  return (
    <>
      {/* {renderTrigger(handleToggleDialog)} */}
      {/* {!openDialog && <TriggerButton />} */}
      {/* {openDialog &&
        createPortal(
          <Dialog/>,
          document.body
        )} */}
      <TriggerButton />
      <Dialog />
    </>
  )
}
