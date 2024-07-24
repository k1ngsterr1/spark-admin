import { io } from "socket.io-client";

export const socket = io("http://localhost:4001", {
  path: "/socket.io/",
  transports: ["polling", "websocket"],
  reconnectionAttempts: 15,
  reconnectionDelay: 2000,
});
