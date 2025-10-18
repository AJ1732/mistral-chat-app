"use client";

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface ChatState {
  messages: ChatMessage[];
}

type ChatAction =
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | {
      type: "UPDATE_MESSAGE";
      payload: { id: string; text: string };
    }
  | {
      type: "APPEND_TO_MESSAGE";
      payload: { id: string; chunk: string };
    }
  | { type: "RESET_CHAT" };

const initialState: ChatState = {
  messages: [],
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? {
                ...msg,
                text: action.payload.text,
                loading: false,
              }
            : msg,
        ),
      };
    case "APPEND_TO_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? {
                ...msg,
                text: msg.text + action.payload.chunk,
                loading: false,
              }
            : msg,
        ),
      };
    case "RESET_CHAT":
      return initialState;
    default:
      return state;
  }
}

interface ChatContextProps {
  state: ChatState;
  dispatch: Dispatch<ChatAction>;
  addChatMessage: (args: {
    text: ChatMessage["text"];
    sender: ChatMessage["sender"];
  }) => string; // NOW RETURNS ID
  updateChatMessage: (id: string, text: string) => void;
  appendToMessage: (id: string, chunk: string) => void;
  startNewChat: () => void;
}

const ChatContext = createContext<ChatContextProps>({
  state: initialState,
  dispatch: () => null,
  addChatMessage: () => "",
  updateChatMessage: () => {},
  appendToMessage: () => {},
  startNewChat: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addChatMessage = ({
    text,
    sender,
  }: {
    text: ChatMessage["text"];
    sender: ChatMessage["sender"];
  }) => {
    const id = uuidv4();
    const message: ChatMessage = {
      id,
      text,
      sender,
      loading: sender === "ai" && text === "",
    };

    dispatch({ type: "ADD_MESSAGE", payload: message });
    return id;
  };

  const updateChatMessage = (id: string, text: string) => {
    dispatch({ type: "UPDATE_MESSAGE", payload: { id, text } });
  };

  const appendToMessage = (id: string, chunk: string) => {
    dispatch({ type: "APPEND_TO_MESSAGE", payload: { id, chunk } });
  };

  const startNewChat = () => dispatch({ type: "RESET_CHAT" });

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        addChatMessage,
        updateChatMessage,
        appendToMessage,
        startNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
