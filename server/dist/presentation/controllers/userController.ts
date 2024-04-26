import { ChangePasswordService } from "../../core/use_cases/User/ChangePassword";
import { JWTService } from "../../core/use_cases/User/JWTService";
import { Request, Response } from "express";
import { CreateUser } from "core/use_cases/User/CreateUser";
import { UserRepository } from "infrastructure/repositories/UserRepository";

import { VerifyService } from "core/use_cases/User/VerifyUser";
import { ChangeUserRoleService } from "core/use_cases/User/ChangeUserRole";
import EmailService from "core/use_cases/User/EmailVerification";
import { ChangePasswordRequest, ChangeRoleRequest, LoginRequest, RegisterRequest } from "@core/utils/User/Request";
import { Login } from "@core/use_cases/User/LoginUser";

class UserController {
  private createUserUseCase: CreateUser;
  private loginLogic: Login;
  private changeUserRoleService: ChangeUserRoleService;
  private verifyService: VerifyService;
  private jwtService: JWTService;
  private changeUserPasswordService: ChangePasswordService;

  constructor() {
    this.jwtService = new JWTService();
    this.changeUserRoleService = new ChangeUserRoleService();
    this.verifyService = new VerifyService();
    this.loginLogic = new Login();
    this.createUserUseCase = new CreateUser();
    this.changeUserPasswordService = new ChangePasswordService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const request: RegisterRequest = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      }
      const newUser = await this.createUserUseCase.execute(request);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response, next: any): Promise<void> {
    try {
      const request: LoginRequest = {
        email: req.body.email,
        password: req.body.password
      }
      const { user, accessToken, refreshToken } = await this.loginLogic.execute(request);
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
      const request: Request = {
        id: req.body.id,
        code: req.body.code,
      }
      const verifyUser = await this.verifyService.execute(request);
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
      const request: ChangePasswordRequest = {
        id: req.user.id,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      }
      await this.changeUserPasswordService.execute(request);
      res.status(200).json({ message: "Password changed successfully" });
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