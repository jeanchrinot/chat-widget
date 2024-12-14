import { createPortal } from "react-dom"
import { useState, useCallback } from "react"

// local imports
// import { AiXFlowsChatDialog } from "@/components/AixFLowsChatDialog";
import { Dialog } from "@/components/Dialog"
import { useLayout } from "@/hooks/useLayout"
import TriggerButton from "./TriggerButton"

interface AixFLowsChatProps {
  infoMessage: React.ReactNode
  name: string
  welcomeMessage: string
  renderTrigger: (onClick: () => void) => React.ReactNode
}

export function AixFLowsChat() {
  const { openDialog, setOpenDialog } = useLayout()

  // const [hasOpened, setHasOpened] = useState(false)
  // const [dialogOpen, setDialogOpen] = useState(false)

  // const handleToggleDialog = useCallback(() => {
  //   setHasOpened(true)
  //   setDialogOpen((prev) => !prev)
  // }, [])

  // const handleCloseDialog = useCallback(() => {
  //   setDialogOpen(false)
  // }, [])

  return (
    <>
      {/* {renderTrigger(handleToggleDialog)} */}
      {!openDialog && <TriggerButton />}
      {openDialog &&
        createPortal(
          <Dialog
          // infoMessage={infoMessage}
          // isOpen={dialogOpen}
          // name={name}
          // welcomeMessage={welcomeMessage}
          // onClose={handleCloseDialog}
          />,
          document.body
        )}
    </>
  )
}
