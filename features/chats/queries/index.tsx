import { useMutation } from "@tanstack/react-query";

import { useNotifications } from "@/provider/notifications";

import { ChatService } from "../service";

export const usePostChatStream = () => {
  const { addNotification, removeNotification } = useNotifications();

  return useMutation({
    mutationFn: async ({
      data,
      onChunk,
    }: {
      data: ChatPost;
      onChunk: (text: string) => void;
    }) => {
      return ChatService.postChatStream(data, onChunk);
    },
    onMutate: () => addNotification({ message: "Thinking", type: "loading" }),
    onSuccess: () => removeNotification(),
    onError: (error) => {
      console.log("Error:", error);
      addNotification({
        message: "Failed to get response. Please try again.",
        type: "error"
      });
      // Auto-dismiss error after 3 seconds
      // setTimeout(() => removeNotification(), 3000);
    },
  });
};
