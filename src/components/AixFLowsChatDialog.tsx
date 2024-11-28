// local imports
import { Dialog } from "./Dialog";

interface AiXFlowsChatDialogProps {
  infoMessage: React.ReactNode;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}

export function AiXFlowsChatDialog({
  infoMessage,
  isOpen,
  name,
  welcomeMessage,
  onClose,
}: AiXFlowsChatDialogProps) {
  return (
    <Dialog
      infoMessage={infoMessage}
      isOpen={isOpen}
      name={name}
      welcomeMessage={welcomeMessage}
      onClose={onClose}
    />
  );
}
