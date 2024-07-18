import { receiveMessageUseCase } from "@core/use_cases/Sockets/receiveMessageUseCase";
import { sendMessageUseCase } from "@core/use_cases/Sockets/sendMessageUseCase";
import { Socket } from "socket.io";

export const registerSocketEvents = (socket: Socket) => {
  socket.on("sendMessage", (message) => {
    sendMessageUseCase(message, (response) => {
      socket.emit("messageSent", response);
    });
  });

  socket.on("receiveMessage", () => {
    receiveMessageUseCase((messages) => {
      socket.emit("updateMessages", messages);
    });
  });
};
