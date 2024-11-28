import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Local imports
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { EmojiPicker } from "./Emoji";

export function MessageForm() {
  const formSchema = z.object({
    content: z.string().min(2, {
      message: "Please type something",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_NEXT_AUTH_API_URL}/api/chat/agent`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Message sent:", res.data);
      form.reset();
    } catch (e) {
      console.error("Error posting message:", e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center px-4 pb-2 pt-1 bg-white border-t border-neutral-200 dark:border-neutral-800"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormMessage className="text-sm font-normal" />

              <FormControl>
                <div className="flex items-center gap-x-3 flex-1 gap-1 relative">
                  <EmojiPicker
                    onChange={(emoji: string) =>
                      field.onChange(`${field.value} ${emoji}`)
                    }
                  />
                  <Input
                    {...field}
                    placeholder="Send a message"
                    className="bg-transparent resize-none w-full border border-gray-300 dark:border-borderColour-dark outline-none focus:outline-none focus:border-primary focus:ring-0 focus:ring-offset-0 rounded-full px-3 flex-1 no-scrollbar"
                  />
                  <div className="flex">
                    <button
                      className="inline-flex items-center justify-center text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none text-primary-foreground rounded-full bg-green-800/50 hover:bg-default-300 h-[42px] w-[42px] p-0 self-end"
                      type="submit"
                      aria-label="Send Message"
                      disabled={form.formState.isLoading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-8 text-primary rtl:rotate-180 skew-x-6"
                      >
                        <path d="m3 3 3 9-3 9 19-9Z"></path>
                        <path d="M6 12h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
