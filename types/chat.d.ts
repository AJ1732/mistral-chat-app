interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface ChatPost {
  message: string;
}

interface ChatResponse {
  response: string;
}