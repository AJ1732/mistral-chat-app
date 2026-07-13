"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { type FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useNotifications } from "@/provider/notifications";

import { useChat } from "../context";
import { usePostChatStream } from "../queries";

const FormSchema = z.object({
  chat: z
    .string("Bio is required.")
    .min(1, {
      message: "Message is required.",
    })
    .max(500, {
      message: "Question must not be longer than 500 characters.",
    }),
});

export default function Chatbox() {
  const { addChatMessage, appendToMessage, setMessageError } = useChat();
  const { addNotification, removeNotification } = useNotifications();
  const { mutateAsync: postChatStream, isPending } = usePostChatStream();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { chat: "" },
    mode: "onSubmit",
  });

  // Surface validation errors as a notification on submit (event-driven).
  function onInvalid(errors: FieldErrors<z.infer<typeof FormSchema>>) {
    const message = errors.chat?.message;
    if (message) {
      addNotification({ message, type: "error" });
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    removeNotification(); // clear any lingering validation error
    addChatMessage({ text: data.chat, sender: "user" });

    const aiMessageId = addChatMessage({ text: "", sender: "ai" });

    try {
      await postChatStream(
        {
          data: { message: data.chat },
          onChunk: (chunk: string) => {
            appendToMessage(aiMessageId, chunk); // Append each chunk to the AI message
          },
        },
        {
          onSuccess: () => form.reset(),
          onError: () => {
            // Mark the message as failed
            setMessageError(aiMessageId);
          },
        },
      );
    } catch {
      // Additional catch for any unhandled errors
      setMessageError(aiMessageId);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="relative h-fit w-full drop-shadow-xl"
      >
        <FormField
          control={form.control}
          name="chat"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ask anything"
                  disabled={isPending}
                  className="no-scrollbar max-h-80 pr-16 leading-[200%]"
                  {...field}
                  onKeyDown={(e) => {
                    if (
                      window.innerWidth >= 640 &&
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit, onInvalid)();
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"icon"}
          disabled={isPending}
          className="absolute right-3 bottom-3 size-10"
        >
          <Send />
        </Button>
      </form>
    </Form>
  );
}
