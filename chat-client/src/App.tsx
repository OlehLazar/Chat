import { HubConnectionBuilder } from "@microsoft/signalr";
import WaitingRoom from "./components/WaitingRoom"

function App() {
  const joinChat = async (userName: string, chatRoom: string) => {
    const connection = new HubConnectionBuilder().withUrl("http://localhost:5264/chat").withAutomaticReconnect().build();
    try {
      await connection.start();
      await connection.invoke("joinChat", { userName, chatRoom });

      console.log(connection);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="flex justify-center bg-[#bfbebe2d]">
      <WaitingRoom joinChat={joinChat}/>
    </div>
  )
}

export default App
