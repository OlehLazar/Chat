import { ChatMessage } from "./ChatMessage";

export interface ChatProps {
    messages: ChatMessage[];
    chatRoom: string;
    closeChat: () => void;
    sendMessage: (message: string) => void;
}