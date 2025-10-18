"use client";

import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

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
  const { addChatMessage, appendToMessage } = useChat();
  const { addNotification, removeNotification } = useNotifications();
  const { mutateAsync: postChatStream, isPending } = usePostChatStream();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { chat: "" },
    mode: "onSubmit",
  });

  // If there is an error, show it as a notification
  useEffect(() => {
    if (form.formState.errors.chat?.message) {
      addNotification({
        message: form.formState.errors.chat.message,
        type: "error",
      });
    } else {
      removeNotification();
    }
  }, [form.formState.errors.chat?.message]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    addChatMessage({ text: data.chat, sender: "user" });

    const aiMessageId = addChatMessage({ text: "", sender: "ai" });
    await postChatStream(
      {
        data: { message: data.chat },
        onChunk: (chunk: string) => {
          appendToMessage(aiMessageId, chunk); // Append each chunk to the AI message
        },
      },
      {
        onSuccess: () => form.reset(),
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
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
                  className="no-scrollbar max-h-80 pr-8 leading-[200%]"
                  {...field}
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
