import { Server } from "socket.io";
import { ChangeLanguage } from "@core/use_cases/User/ChangeLanguage";
import { ChangeTheme } from "@core/use_cases/User/ChangeTheme";

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
    this.changeLanguageUseCase = new ChangeLanguage();
    this.configureSocketListeners();
  }

  private configureSocketListeners(): void {
    this.io.on("connection", (socket: any) => {
      console.log(`Client connected with id: ${socket.id}`);

      socket.on("register", (userId) => {
        userSockets.set(userId, socket.id);
        socket.userId = userId; // Attach userId to the socket for later use
      });

      socket.on("disconnect", () => {
        userSockets.delete(socket.userId);
        console.log(`Client disconnected: ${socket.id}`);
      });

      socket.on("changeThemeRequest", async (data: any, callback: Function) => {
        const { userId, newTheme } = data;

        console.log("change theme socket!");

        try {
          const socketId = userSockets.get(userId);

          const errors: any[] = [];
          const result = await this.changeThemeUseCase.execute(
            userId,
            newTheme,
            errors
          );

          if (errors.length > 0) {
            socket.emit("themeChangeError", { success: false, errors });
          } else {
            this.io.emit("themeChanged", { success: true, theme: result });
            callback({ success: true, theme: result });
          }
        } catch (error) {
          console.error("Error changing theme:", error);
          socket.emit("themeChangeError", {
            success: false,
            error: "Internal server error",
          });
          callback({ success: false, error: "Internal server error" });
        }
      });

      socket.on(
        "changeLanguageRequest",
        async (data: any, callback: Function) => {
          const { userId, newLanguage } = data;

          console.log("language socket is working!", data);

          try {
            const socketId = userSockets.get(userId);

            const errors: any[] = [];
            const result = await this.changeLanguageUseCase.execute(
              userId,
              newLanguage,
              errors
            );

            if (errors.length > 0) {
              this.io.emit("languageChangedError", {
                success: false,
                language: result,
              });
            } else {
              this.io.emit("languageChanged", {
                success: true,
                language: result,
              });
              callback({ success: true, language: result });
            }
          } catch (error) {
            console.error("Error changing language:", error);
            socket.emit("languageChangeError", {
              success: false,
              error: "Internal server error",
            });
            callback({ success: false, error: "Internal server error" });
          }
        }
      );
    });
  }

  public changeUserTheme(userId: string, newTheme: "light" | "dark"): void {
    const socketId = userSockets.get(userId);
    if (socketId && this.io.sockets.sockets.get(socketId)) {
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
