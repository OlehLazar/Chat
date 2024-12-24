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
  
  const sendMessage = async (message: string) => {
    try {
      if (connection) {
        await connection.invoke("SendMessage", message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const closeChat = async () => {
    await connection?.stop();
    setConnection(undefined);
  }

  return (
    <div className="bg-[#bfbebe2d] min-h-screen">
      <div className="flex justify-center pt-5">
        {connection? <Chat messages={messages} chatRoom={chatRoom} closeChat={closeChat} sendMessage={sendMessage} /> : <WaitingRoom joinChat={joinChat}/>}
      </div>
    </div>
  )
}

export default App
