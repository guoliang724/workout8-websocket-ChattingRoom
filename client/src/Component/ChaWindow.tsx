import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import ChattingBox from './ChattingBox';
import ChattingRecord from './ChattingRecord';
import MemberList from './MemberList';


import "./ChatWindow.css";

type History = {
  name: string,
  content: string,
  data: number,
};

type DefaultEventsMap = any;

const baseURL = "ws://localhost:9528";
const _updateUser = "$updateUser";
const _name = "$name";
const _history = "$history";
const _message = "$message";

export default function ChaWindow() {
  // online users
  const [users, setUsers] = useState<string[]>([]);
  // self
  const [self, setSelf] = useState("");
  // chat history 
  const [chatHistory, setChathistory] = useState<History[]>();
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();


  const handleChat = (msg: any) => {
    let _: any[];
    if (chatHistory === undefined) _ = [];
    else _ = [...chatHistory];
    _.push(msg);
    setChathistory(_)

    socket?.emit(_message, msg.content)
  }

  useEffect(() => {
    const socket = io(baseURL);
    setSocket(socket);

    socket.on(_updateUser, (users) => {
      setUsers(users);
    })

    socket.on(_name, (name) => {
      setSelf(name);
    })

    socket.on(_history, (history) => {
      setChathistory(history);
    })

    return () => {
      socket.disconnect();
      console.log("close the websocket disconnection.....");
    }
  }, [])

  useEffect(() => {
    if (!socket) return;
    socket.on(_message, (m: any) => {
      let _: any[];
      if (chatHistory === undefined) _ = [];
      else _ = [...chatHistory];
      _.push(m)
      setChathistory(_);
    })

  }, [socket, chatHistory])

  return (
    <div className="chattingContainer">
      <div className='left'>
        <MemberList users={users} />
      </div>
      <div className="right">
        <ChattingRecord myName={self} history={chatHistory} />
        <ChattingBox chat={handleChat} myName={self} />
      </div>
    </div>
  )
}
