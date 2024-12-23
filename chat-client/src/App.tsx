import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import WaitingRoom from "./components/WaitingRoom"
import { useState } from "react";
import Chat from "./components/Chat";
import { ChatMessage } from "./interfaces/ChatMessage";

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [chatRoom, setChatRoom] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);


  const joinChat = async (userName: string, chatRoom: string) => {
    const connection = new HubConnectionBuilder().withUrl("https://localhost:7193/chat").withAutomaticReconnect().build();
    
    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((messages) => [...messages, {userName, message}])
    });
    
    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom });

      setConnection(connection);
      setChatRoom(chatRoom);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="flex justify-center bg-[#bfbebe2d] min-h-screen">
      {connection? <Chat messages={messages} chatRoom={chatRoom} /> : <WaitingRoom joinChat={joinChat}/>}
    </div>
  )
}

export default App
