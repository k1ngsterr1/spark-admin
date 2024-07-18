import { Server, Socket } from "socket.io";
import { ChangeTheme } from "@core/use_cases/Theme/ChangeTheme";

const userSockets = new Map();

export class SocketService {
  private io: Server;
  private changeThemeUseCase: ChangeTheme;

  constructor(server: any) {
    this.io = new Server(server, {
      transports: ["websocket", "polling"],
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type"],
      },
      path: "/socket.io/",
    });

    this.changeThemeUseCase = new ChangeTheme();
    this.configureSocketListeners();
  }

  private configureSocketListeners(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`Client connected with id: ${socket.id}`);

      socket.on("register", (userId) => {
        console.log("socket is registered!");
        userSockets.set(userId, socket.id);
      });

      console.log("userSockets are here:", userSockets);

      // Handle theme change requests individually
      socket.on(
        "changeThemeRequest",
        async (theme: "light" | "dark", callback: Function) => {
          try {
            const errors: any[] = [];
            const result = await this.changeThemeUseCase.execute(theme, errors);
            if (errors.length > 0) {
              socket.emit("themeChangeError", { success: false, errors }); // Send errors back to the requester
            } else {
              socket.emit("themeChanged", { success: true, theme: result }); // Send the new theme only to the requester
            }
          } catch (error) {
            console.error("Error changing theme:", error);
            socket.emit("themeChangeError", {
              success: false,
              error: "Internal server error",
            });
          }
        }
      );

      socket.on("disconnect", () => {
        // userSockets.delete(socket.userId);
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
}
