import Button from "./Button"
import { ChatProps } from "../interfaces/ChatProps"
import Message from "./Message"
import { useState } from "react"

const Chat: React.FC<ChatProps> = ({ messages, chatRoom, closeChat, sendMessage}) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage(""); // Clear input field
    }
  };

  return (
    <div className="w-1/2 bg-[#ffff] rounded-sm shadow-[#11111178] shadow-sm p-8">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="font-semibold text-2xl text-center pb-3">{chatRoom}</h1>
        <Button onClick={closeChat}>Close the chat</Button>
      </div>
      <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
        {messages.map((messageInfo, index) => (
          <Message userName={messageInfo.userName} message={messageInfo.message} key={index} />
        ))}
      </div>
      <div className="flex items-center gap-3 pt-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-md px-4 py-2"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

export default Chat