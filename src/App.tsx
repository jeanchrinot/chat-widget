import { AixFLowsChat } from "@/aiChat";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="h-screen flex items-center justify-center flex-col gap-x-8 bg-gray-900">
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-extrabold">AI Chat with AixFlows</h1>
        <p>Click the button to open the chat window</p>
        <p>
          <AixFLowsChat
            name=" AI Bot"
            infoMessage="AI can make mistakes. Verify answers."
            welcomeMessage="Hey there, what can I help you with?"
            renderTrigger={(onClick) => (
              <Button
                onClick={onClick}
                className="relative outline-none px-6 py-4 inline-flex items-center justify-center  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 text-white"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                </span>
                <span className="relative p-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                  Open AI chat
                </span>
              </Button>
            )}
          />
        </p>
      </div>
    </main>
  );
}

export default App;
