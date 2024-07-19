import { Server } from "socket.io";
import { ChangeTheme } from "@core/use_cases/Theme/ChangeTheme";
import { ChangeLanguage } from "@core/use_cases/Language/ChangeLanguage";

const userSockets = new Map<string, string>();

export class SocketService {
  private io: Server;
  private changeThemeUseCase: ChangeTheme;
  private changeLanguageUseCase: ChangeLanguage;

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
    this.io.on("connection", (socket: any) => {
      console.log(`Client connected with id: ${socket.id}`);

      socket.on("register", (userId) => {
        console.log("socket is registered!");
        userSockets.set(userId, socket.id);
        socket.userId = userId; // Attach userId to the socket for later use
      });

      socket.on("disconnect", () => {
        userSockets.delete(socket.userId);
        console.log(`Client disconnected: ${socket.id}`);
      });

      socket.on("changeThemeRequest", async (data: any, callback: Function) => {
        const { userId, theme } = data;

        try {
          const socketId = userSockets.get(userId);

          console.log(
            "socket id is here:",
            socketId,
            "user sockets:",
            userSockets
          );

          const errors: any[] = [];
          const result = await this.changeThemeUseCase.execute(theme, errors);
          if (errors.length > 0) {
            socket.emit("themeChangeError", { success: false, errors });
          } else {
            socket.emit("themeChanged", { success: true, theme: result });
          }
        } catch (error) {
          console.error("Error changing theme:", error);
          socket.emit("themeChangeError", {
            success: false,
            error: "Internal server error",
          });
        }
      });

      socket.on(
        "changeLanguageRequest",
        async (data: any, callback: Function) => {
          const { userId, language } = data;

          try {
            const socketId = userSockets.get(userId);

            console.log(
              "socket id is here:",
              socketId,
              "user sockets:",
              userSockets
            );

            const errors: any[] = [];
            const result = await this.changeLanguageUseCase.execute(
              language,
              errors
            );
            if (errors.length > 0) {
              socket.emit("languageChangeError", { success: false, errors });
            } else {
              socket.emit("languageChanged", {
                success: true,
                theme: result,
              });
            }
          } catch (error) {
            console.error("Error changing language:", error);
            socket.emit("languageChangeError", {
              success: false,
              error: "Internal server error",
            });
          }
        }
      );
    });
  }

  public changeUserTheme(userId: string, newTheme: "light" | "dark"): void {
    const socketId = userSockets.get(userId);
    console.log("socketId:", socketId);
    if (socketId && this.io.sockets.sockets.get(socketId)) {
      console.log("changed for specific user!");
      this.io.to(socketId).emit("themeChanged", newTheme);
    } else {
      console.log("User socket not found or disconnected.");
    }
  }

  public changeUserLanguage(userId: string, newLanguage: "RU" | "EN"): void {
    const socketId = userSockets.get(userId);
    console.log("socketId:", socketId);
    if (socketId && this.io.sockets.sockets.get(socketId)) {
      console.log("changed for specific user!");
      this.io.to(socketId).emit("languageChanged", newLanguage);
    } else {
      console.log("User socket not found or disconnected.");
    }
  }
}

export { userSockets };