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
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { generateVerificationCode } from "@core/utils/generateCode"; // Ensure the path is correct
import EmailService from "@core/use_cases/User/EmailVerification";
import { ChangeTheme } from "@core/use_cases/User/ChangeTheme";
import { GetTheme } from "@core/use_cases/User/GetTheme";
import { ChangeLanguage } from "@core/use_cases/User/ChangeLanguage";
import { GetLanguage } from "@core/use_cases/User/GetLanguage";

class UserController {
  private createUserUseCase: CreateUser;
  private loginLogic: Login;
  private emailVerification: EmailService;
  private userRepository: UserRepository;
  private isSparkAdminLogic: CheckAdminRole;
  private changeUserRoleService: ChangeUserRoleService;
  private verifyService: VerifyService;
  private jwtService: JWTService;
  private changeThemeUseCase: ChangeTheme;
  private getThemeUseCase: GetTheme;
  private changeLanguageUseCase: ChangeLanguage;
  private getLanguageUseCase: GetLanguage;
  private changeUserPasswordService: ChangePasswordService;

  constructor() {
    this.jwtService = new JWTService();
    this.emailVerification = new EmailService();
    this.userRepository = new UserRepository();
    this.isSparkAdminLogic = new CheckAdminRole();
    this.changeUserRoleService = new ChangeUserRoleService();
    this.verifyService = new VerifyService();
    this.loginLogic = new Login();
    this.createUserUseCase = new CreateUser();
    this.changeThemeUseCase = new ChangeTheme();
    this.getThemeUseCase = new GetTheme();
    this.changeLanguageUseCase = new ChangeLanguage();
    this.getLanguageUseCase = new GetLanguage();
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

      const data = await this.loginLogic.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      const { user, accessToken, refreshToken } = data;

      res.cookie("refreshToken", refreshToken, {
        maxAge: parseInt(process.env.COOKIE_LIFESPAN || "3600000"), // Ensure COOKIE_LIFESPAN is an integer
        httpOnly: true,
      });

      // Check if the user is verified
      if (!user.isVerified) {
        const verificationCode = generateVerificationCode();

        await this.userRepository.saveVerificationCode(user, verificationCode);

        await this.emailVerification.sendVerificationEmail(
          user.email,
          user.username,
          verificationCode
        );

        res.status(200).json({
          message:
            "Пользователь вошёл успешно. Код подтверждения отправлен на почту.",
          user,
          accessToken,
          refreshToken,
        });

        return;
      }

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
        id: req.user.id,
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
        .json({ message: "Пользователь успешно подтвержден!", verifyUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Отправка письма еще раз
  async resendVerificationEmail(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];

    try {
      const userId = req.user.id;
      const user = await this.userRepository.findByPk(userId);

      if (!user) {
        errors.push(new ErrorDetails(404, "Пользователь не найден."));
        res.status(404).json({ message: "Пользователь не найден." });
        return;
      }

      if (user.isVerified) {
        res.status(400).json({ message: "Пользователь уже подтвержден." });
        return;
      }

      // Generate a new verification code using the function
      const verificationCode = generateVerificationCode();

      // Send the verification email
      await this.emailVerification.sendVerificationEmail(
        user.email,
        user.username,
        verificationCode
      );

      res
        .status(200)
        .json({ message: "Письмо с подтверждением отправлено повторно." });
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
        message: "Ошибка со сменой пароля:",
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

  // Проверка является ли пользователь Spark Admin'ом
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
          .status(200)
          .json({ message: "Доступ разрешен, вы админ", value: isAdmin });
      }
    } catch (error: any | unknown) {
      res.status(500).json({
        message: "Ошибка с изменением роли:",
        error: error.message,
      });
    }
  }

  // Смена темы
  async changeTheme(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const theme: "light" | "dark" = req.body.theme;
      const userId = req.user.id;

      const updatedTheme = await this.changeThemeUseCase.execute(
        userId,
        theme,
        errors
      );

      res
        .status(201)
        .json({ message: "Тема успешно обновлена", theme: updatedTheme });
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: `Ошибка при измении темы` });
    }
  }

  // Получение темы
  async getTheme(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId = req.user.id;

      console.log("controller is working!");

      const theme = await this.getThemeUseCase.execute(userId, errors);

      res.status(201).json({ message: "Тема успешно получена:", theme: theme });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: `Ошибка при измении темы`, error: error.message });
    }
  }

  // Смена языка
  async changeLanguage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const language: "RU" | "EN" = req.body.language;
      const userId = req.user.id;

      const updatedLanguage = await this.changeLanguageUseCase.execute(
        userId,
        language,
        errors
      );

      res
        .status(201)
        .json({ message: "Язык успешно обновлен", language: updatedLanguage });
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: `Ошибка при измении языка` });
    }
  }

  // Получение языка
  async getLanguage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId = req.user.id;

      const language = await this.getLanguageUseCase.execute(userId, errors);

      res
        .status(201)
        .json({ message: "Язык успешно получен:", language: language });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: `Ошибка при измении языка`, error: error.message });
    }
  }
}

export default new UserController();
