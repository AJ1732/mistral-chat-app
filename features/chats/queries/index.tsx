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
    onSettled: () => removeNotification(),
    onError: (error) => {
      console.log("Error:", error);
      addNotification({ message: "Something went wrong", type: "error" });
    },
  });
};
