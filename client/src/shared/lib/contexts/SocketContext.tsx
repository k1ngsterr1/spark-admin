"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserData } from "../hooks/Form/useGetData";
import io from "socket.io-client";

const SocketContext = createContext(undefined);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userData } = useUserData();
  const userId = userData?.email;

  useEffect(() => {
    const newSocket = io("http://localhost:4001", {
      query: { userId },
      path: "/socket.io/",
      transports: ["polling", "websocket"],
      reconnectionAttempts: 15,
      reconnectionDelay: 2000,
    });

    newSocket.on("connect", () => {
      newSocket.emit("register", userId);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
