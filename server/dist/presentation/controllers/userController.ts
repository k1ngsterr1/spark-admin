import { ChangePasswordService } from "../../core/use_cases/User/ChangePassword";
import { JWTService } from "../../core/use_cases/User/JWTService";
import { Request, Response } from "express";
import { CreateUser } from "core/use_cases/User/CreateUser";
import { VerifyService } from "core/use_cases/User/VerifyUser";
import { ChangeUserRoleService } from "core/use_cases/User/ChangeUserRole";
import {
  ChangePasswordRequest,
  ChangeRoleRequest,
  LoginRequest,
  RegisterRequest,
} from "@core/utils/User/Request";
import { Login } from "@core/use_cases/User/LoginUser";
import { ErrorDetails } from "@core/utils/utils";
import { CheckAdminRole } from "@core/use_cases/User/CheckAdmin";

class UserController {
  private createUserUseCase: CreateUser;
  private loginLogic: Login;
  private isSparkAdminLogic: CheckAdminRole;
  private changeUserRoleService: ChangeUserRoleService;
  private verifyService: VerifyService;
  private jwtService: JWTService;
  private changeUserPasswordService: ChangePasswordService;

  constructor() {
    this.jwtService = new JWTService();
    this.isSparkAdminLogic = new CheckAdminRole();
    this.changeUserRoleService = new ChangeUserRoleService();
    this.verifyService = new VerifyService();
    this.loginLogic = new Login();
    this.createUserUseCase = new CreateUser();
    this.changeUserPasswordService = new ChangePasswordService();
  }

  // Создание пользователя
  async createUser(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: RegisterRequest = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
      };

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      const newUser = await this.createUserUseCase.execute(request, errors);
      res
        .status(201)
        .json({ message: "Пользователь успешно создан", user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Вход в систему
  async login(req: Request, res: Response, next: any): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: LoginRequest = {
        email: req.body.email,
        password: req.body.password,
      };
      const { user, accessToken, refreshToken } = await this.loginLogic.execute(
        request,
        errors
      );

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.cookie("refreshToken", refreshToken, {
        maxAge: process.env.COOKIE_LIFESPAN,
        httpOnly: true,
      });
      res.status(200).json({
        message: "Пользователь вошёл успешно",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка при входе в систему" });
    }
  }

  // Подтверждение пользователя
  async verifyUser(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: Request = {
        id: req.body.id,
        code: req.body.code,
      };
      const verifyUser = await this.verifyService.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res
        .status(201)
        .json({ message: "User verified successfully", verifyUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Инициация смены пароля
  async initiatePasswordChange(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userID = req.user.id;

      if (!userID) {
        return res
          .status(404)
          .json({ message: "ID пользователя не существует :(" });
      }

      await this.changeUserPasswordService.initiatePasswordChange(
        userID,
        errors
      );

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res
        .status(200)
        .json({ message: "Специальный код был высланан на вашу почту" });
    } catch (error) {
      res.status(500).json({
        message: "Ошибка с инициацией изменения пароля:",
        error: error.message,
      });
    }
  }

  // Смена пароля юзера
  async changeUserPassword(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: ChangePasswordRequest = {
        id: req.user.id,
        newPassword: req.body.newPassword,
        code: req.body.code,
      };

      await this.changeUserPasswordService.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Пароль успешно изменен" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка со сменой пароля", error: error.message });
    }
  }

  // Смена роли юзера
  async changeUserRole(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const request: ChangeRoleRequest = {
        userId: user.id,
        newRole: req.body.newRole,
      };

      await this.changeUserRoleService.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Роль пользователя успешно изменена" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка с изменением роли:", error: error.message });
    }
  }

  async checkSparkAdmin(req: Request, res: Response): Promise<boolean> {
    const userID = req.user.id;

    try {
      const isAdmin = await this.isSparkAdminLogic.execute(userID);

      if (!isAdmin) {
        return res.status(403).json({
          message: "Доступ запрещен, вы не спарк админ",
          value: isAdmin,
        });
      } else {
        return res
          .status(201)
          .json({ message: "Доступ разрешен, вы админ", value: isAdmin });
      }
    } catch (error: any | unknown) {
      res.status(500).json({
        message: "Ошибка с изменением роли:",
        error: error.message,
      });
    }
  }
}

export default new UserController();
