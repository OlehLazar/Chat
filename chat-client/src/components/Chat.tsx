import Button from "./Button"
import { ChatProps } from "../interfaces/ChatProps"
import Message from "./Message"

const Chat: React.FC<ChatProps> = ({ messages, chatRoom, closeChat}) => {
  return (
    <div className="w-1/2 bg-[#ffff] rounded-sm shadow-[#11111178] shadow-sm">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="font-semibold text-2xl text-center pb-3">{chatRoom}</h1>
        <Button onClick={closeChat}>Close the chat</Button>
      </div>
      <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
        {messages.map((messageInfo, index) => (
          <Message userName={messageInfo.userName} message={messageInfo.message} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Chat