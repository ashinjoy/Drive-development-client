import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
export const SocketProvider = createContext(null);

function SocketWrapper({ children }) {
  const [socket, setSocket] = useState(null);
  const [chatSocket,setChatSocket] = useState(null)

  useEffect(() => {
    const socketInstance = io("http://localhost:3003");
    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      console.log("inside the socketProvoder");
      console.log("connected successFully");
    });
    socketInstance.on("connect_error", (err) => {
      console.error(err);
    });
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      } 
    };
  }, []);

  useEffect(()=>{
    const chatSocketInstance = io("http://localhost:3004")
    setChatSocket(chatSocketInstance)
    chatSocketInstance.on("connect",()=>{
      console.log("connected SuccessFully");
      
    })
    chatSocketInstance.on("connect_error",(err)=>{
      console.log("connection error",err);
      
    })

    return ()=>{
      chatSocketInstance.disconnect()
    }

  },[])

  return (
    <SocketProvider.Provider value={{socket,chatSocket}}>{children}</SocketProvider.Provider>
  );
}

export default SocketWrapper;
