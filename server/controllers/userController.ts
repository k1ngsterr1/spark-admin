import { Request, Response } from 'express';
import { User } from "@models/userModel";
import { CreateUser } from "@use_cases/User/CreateUser";
import { UserRepository } from "repositories/UserRepository";
import { LoginUser } from '@use_cases/User/LoginUser';
import EmailService from "@use_cases/User/EmailVerification";
import bcryptjs from "bcryptjs";
import sequelize from "config/sequelize";


const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

class UserController {
  private createUserUseCase: CreateUser;
  private loginUserUseCase: LoginUser;
  private userRepository: UserRepository; 
  private emailService: EmailService; 

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
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
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this.loginUserUseCase.execute({ email, password });

      res.status(200).json({
        message: 'User logged in successfully',
        user,
        accessToken,
        refreshToken,
      });
  } catch (error){
    if (error.message === 'Пользователь не найден!' || error.message === 'Неверный пароль!') {
      res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
    } else {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  }
  }
  async verifyUser(req, res) {
    try {
      const { userCode, userID } = req.body;
      const userRepository = sequelize.getRepository(User);
      const user = userRepository.findByPk(userID);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(userCode);

      if ((await user).verificationCode === userCode) {
        (await user).isVerified = true;
        (await user).verificationCode = null;
        (await user).save;

        res.json({ message: "User successfully verified" });
      } else {
        res.status(400).json({ message: "Invalid verification code" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async changeUserPassword(req, res) {
    try {
      const { userId, oldPassword, newPassword } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordChanged = await user.changePassword(
        oldPassword,
        newPassword
      );
      if (!passwordChanged) {
        return res.status(400).json({ message: "Incorrect old password" });
      }


      await user.save();

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error changing password", error: error.message });
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
