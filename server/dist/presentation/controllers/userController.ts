import { ChangePasswordService } from "../../core/use_cases/User/ChangePassword";
import { JWTService } from "../../core/use_cases/User/JWTService";
import { Request, Response } from "express";
import { CreateUser } from "core/use_cases/User/CreateUser";
import { UserRepository } from "infrastructure/repositories/UserRepository";
import { LoginUser } from "core/use_cases/User/LoginUser";
import { VerifyService } from "core/use_cases/User/VerifyUser";
import { ChangeUserRoleService } from "core/use_cases/User/ChangeUserRole";
import EmailService from "core/use_cases/User/EmailVerification";
import { ChangePasswordRequest, ChangeRoleRequest } from "@core/utils/types";

class UserController {
  private createUserUseCase: CreateUser;
  private loginUserUseCase: LoginUser;
  private userRepository: UserRepository;
  private emailService: EmailService;
  private changePasswordService: ChangePasswordService;
  private changeUserRoleService: ChangeUserRoleService;
  private verifyService: VerifyService;
  private jwtService: JWTService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
    this.jwtService = new JWTService();
    this.changeUserRoleService = new ChangeUserRoleService();
    this.changePasswordService = new ChangePasswordService();
    this.verifyService = new VerifyService();
    this.loginUserUseCase = new LoginUser();
    this.createUserUseCase = new CreateUser();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.createUserUseCase.execute(req.body);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response, next: any): Promise<void> {
    try {
      const { user, accessToken, refreshToken } = await this.loginUserUseCase.execute(req.body);
      res.cookie('refreshToken', refreshToken, { maxAge: process.env.COOKIE_LIFESPAN, httpOnly: true });
      res.status(200).json({
        message: "Пользователь вошёл успешно",
        user,
        accessToken,
        refreshToken,
      });
      next();
    } catch (error) {
      if (
        error.message === "Пользователь не найден!" ||
        error.message === "Неверный пароль!"
      ) {
        res.status(401).json({ message: "Неверный логин или пароль." });
      } else {
        res
          .status(500)
          .json({ message: "Упс! Ошибочка:", error: error.message });
      }
    }
  }

  async verifyUser(req: Request, res: Response): Promise<void> {
    try {
      if(req.cookie.refreshToken !== null){

      }
      const id = req.cookies.user.id;
      const code = req.body.code;
      console.log(id, code);
      const verifyUser = await this.verifyService.execute({id, code});
      res
        .status(201)
        .json({ message: "User verified successfully", verifyUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async changeUserPassword(req: Request, res: Response, next: any): Promise<void> {
    try {
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const request: ChangePasswordRequest = {
        id: user.id,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      }
      res.status(200).json({ message: "Password changed successfully" });
      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error changing password", error: error.message });
    }
  }

  async changeUserRole(req: Request, res: Response): Promise<void> {
    try {
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const request: ChangeRoleRequest = {
        userId: user.id,
        newRole: req.body.newRole
      }
      await this.changeUserRoleService.execute(request);

      res
        .status(200)
        .json({ message: "Роль пользователя успешно изменена" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка с изменением роли:", error: error.message });
    }
  }
}

export default new UserController();