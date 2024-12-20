import { JoinProps } from "./interfaces/JoinProps";
import { HubConnectionBuilder } from "@microsoft/signalr";
import WaitingRoom from "./components/WaitingRoom"

function App() {
  const joinChat: React.FC<JoinProps> = async (userName, chatRoom) => {
    const connection = new HubConnectionBuilder().withUrl("http://localhost:5134/chat").withAutomaticReconnect().build();
    try {
      await connection.start();
      await connection.invoke("joinChat", { userName, chatRoom });

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center bg-[#bfbebe2d]">
      <WaitingRoom/>
    </div>
  )
}

export default App
