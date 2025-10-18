interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  loading?: boolean;
}

interface ChatPost {
  message: string;
}

interface ChatResponse {
  response: string;
}
