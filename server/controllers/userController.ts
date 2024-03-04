import { ChangePasswordService } from './../use_cases/User/ChangePassword';
import { JWTService } from './../use_cases/User/JWTService';
import { Request, Response } from 'express';
import { User } from "@models/userModel";
import { CreateUser } from "@use_cases/User/CreateUser";
import { UserRepository } from "repositories/UserRepository";
import { LoginUser } from '@use_cases/User/LoginUser';
import { VerifyService } from '@use_cases/User/VerifyUser';

import EmailService from "@use_cases/User/EmailVerification";
import sequelize from "config/sequelize";




class UserController {
  private createUserUseCase: CreateUser;
  private loginUserUseCase: LoginUser;
  private userRepository: UserRepository; 
  private emailService: EmailService; 
  private changePasswordService: ChangePasswordService;
  private verifyService: VerifyService;
  private jwtService: JWTService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
    this.changePasswordService = new ChangePasswordService(this.userRepository)
    this.verifyService = new VerifyService(this.userRepository)
    this.loginUserUseCase = new LoginUser(this.userRepository, this.jwtService);
    this.createUserUseCase = new CreateUser(this.userRepository, this.emailService);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await this.createUserUseCase.execute(req.body);
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { user, accessToken, refreshToken } = await this.loginUserUseCase.execute(req.body);
        res.status(200).json({
        message: 'Пользователь вошёл успешно',
        user,
        accessToken,
        refreshToken,
      });
  } catch (error){
    if (error.message === 'Пользователь не найден!' || error.message === 'Неверный пароль!') {
      res.status(401).json({ message: 'Неверный логин или пароль.' });
    } else {
      res.status(500).json({ message: 'Упс! Ошибочка:', error: error.message,});
    }
  }
  }

  async verifyUser(req: Request, res: Response): Promise<void> {
    try {
     const verifyUser = await this.verifyService.execute(req.body)     
     res.status(201).json({message: "User verified successfully", verifyUser})

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async changeUserPassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId, oldPassword, newPassword } = req.body;
      await this.changePasswordService.execute(userId, oldPassword, newPassword);
      res.status(200).json({ message: "Password changed successfully" });
      
    }  catch (error) {
      res.status(500).json({ message: "Error changing password", error: error.message });
    }

  }

  async changeUserRole(req, res) {
    try {
      const { userId, newRole } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = newRole;

      await user.save();
      res.json({ message: "Role updated successfully", role: user.role });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error changing role:", error: error.message });
    }
  }
}

export default new UserController();
