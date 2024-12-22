import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import WaitingRoom from "./components/WaitingRoom"
import { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [connection, setConnection] = useState<HubConnection>();

  const joinChat = async (userName: string, chatRoom: string) => {
    const connection = new HubConnectionBuilder().withUrl("https://localhost:7193/chat").withAutomaticReconnect().build();
    
    connection.on("ReceiveMessage", (userName, message) => {
      alert(message);
    });
    
    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom });

      setConnection(connection);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="flex justify-center bg-[#bfbebe2d]">
      {connection? <Chat /> : <WaitingRoom joinChat={joinChat}/>}
    </div>
  )
}

export default App
