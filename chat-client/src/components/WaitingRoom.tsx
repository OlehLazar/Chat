import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { WaitingRoomProps } from "../interfaces/WaitingRoomProps";

const WaitingRoom: React.FC<WaitingRoomProps> = (joinChat) => {
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  const onSubmit = (e) => {
    e.PreventDefault();
    joinChat();
  }

  return (
    <form
    onSubmit={onSubmit}
    className="w-1/5 p-5 bg-[#ffff] rounded-sm shadow-[#11111178] shadow-sm"
    >
      <h1 className="font-semibold text-2xl text-center pb-3">Online chat</h1>
      <div className="flex flex-col gap-5 justify-center">
        <p>User name</p>
        <Input onChange={(e) => setUserName(e.target.value)} placeholder="enter your name" name="userName" />
        <p>Chat name</p>
        <Input onChange={(e) => setChatRoom(e.target.value)} placeholder="enter your chat name" name="chatRoom" />  
        <div className="text-center">
          <Button type="submit">
            Join the chat
          </Button>
        </div>
      </div>
    </form>
  )
}

export default WaitingRoom