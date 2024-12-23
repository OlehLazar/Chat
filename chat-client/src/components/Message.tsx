import { ChatMessage } from "../interfaces/ChatMessage"

const Message: React.FC<ChatMessage> = (messageInfo) => {
  return (
    <div className="w-fit">
        <span className="text-sm">{messageInfo.userName}</span>
        <div className="p-2 rounded-lg shadow-md">
            {messageInfo.message}
        </div>
    </div>
  )
}

export default Message