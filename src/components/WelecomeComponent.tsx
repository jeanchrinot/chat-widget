import axios from "axios";
import { useNavigate } from "react-router-dom";

// local imports
import { useSession } from "@/hooks/useSession";

function WelecomeComponent() {
  const { session } = useSession();
  const navigate = useNavigate();

  const startConversation = async (message: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_NEXT_AUTH_API_URL}/api/conversations`,
        JSON.stringify({ message }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const conversationId = res.data.id;

      navigate(`/${conversationId}`, {
        state: { message },
      });
    } catch (err) {
      console.error("Error starting conversation:", err);
    }
  };

  return (
    <div className="flex-1 relative p-2 bg-white">
      <div className="relative space-y-4">
        {session ? (
          <div className="bg-gray-200 p-2 w-5/6 rounded-2xl">
            <p>Hey👋🏾! {session?.user?.name} I'm Chelsea</p>
          </div>
        ) : (
          <span>
            Hey! 👋🏾 I'm Chelsea, your virtual assistant. How can I help you
            today?
          </span>
        )}
        <div className="bg-gray-200 p-2 w-5/6 rounded-2xl">
          <p>Can I help you with any of these topics? 🤔</p>
        </div>

        <div className="flex items-center flex-col space-y-4">
          <button
            className="cursor-pointer flex items-center space-x-2 bg-fuchsia-200 p-2 w-5/6 rounded-xl"
            onClick={() =>
              startConversation("Can you write a report based on my data?")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-fuchsia-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>

            <p>Can you write a report based on my data?</p>
          </button>

          <button
            className="cursor-pointer flex items-center space-x-2 bg-fuchsia-200 p-2 w-5/6 rounded-xl"
            onClick={() =>
              startConversation(
                "Write a script to automate sending daily email reports in Python."
              )
            }
          >
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
            <p>
              Write a script to automate sending daily email reports in Python,
              and walk me through how I would set it up.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelecomeComponent;
