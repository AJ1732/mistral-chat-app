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

const FormSchema = z.object({
  chat: z
    .string("Bio is required.")
    .min(10, {
      message: "Chat must be at least 10 characters.",
    })
    .max(160, {
      message: "Question must not be longer than 30 characters.",
    }),
});

export default function Chatbox() {
  const { addChatMessage } = useChat();
  const { addNotification, removeNotification } = useNotifications();

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
    addNotification({ message: "Analyzing", type: "loading" });
    setTimeout(() => removeNotification(), 3000);
    setTimeout(() => addChatMessage({ text: data.chat, sender: "ai" }), 3500);
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
          className="absolute right-3 bottom-3 size-10"
        >
          <Send />
        </Button>
      </form>
    </Form>
  );
}
