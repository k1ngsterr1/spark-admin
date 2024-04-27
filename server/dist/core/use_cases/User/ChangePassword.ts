import { ChangePasswordRequest } from "@core/utils/User/Request";
import { validPassword } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { IUserRepository } from "core/interfaces/IUserRepository";
import EmailService from "./EmailVerification";

const verificationCodeGenerator = require("@core/utils/generateCode");

// Смена пароля
export class ChangePasswordService {
  private userRepository: UserRepository;
  private emailService: EmailService;
  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  async initiatePasswordChange(userId: number): Promise<void> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const verificationCode = generateVerificationCode(5);

    // Сохранение кода подтверждения
    await this.userRepository.saveVerificationCode(user, verificationCode);

    // Отправление кода подтверждения
    await this.emailService.sendVerificationEmail(
      user.email,
      user.username,
      verificationCode
    );
  }

  async execute(request: ChangePasswordRequest): Promise<boolean> {
    const { id, oldPassword, newPassword, code } = request;
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new Error("Пользователь не найден!");
    }

    // Проверка валидности пароля
    const isCodeValid = await this.userRepository.verifyCode(user, code);

    if (!isCodeValid) {
      throw new Error("Неправильный или устаревший код!");
    }

    // Проверка совпадения паролей
    const passwordMatch = await user.verifyPassword(oldPassword);

    if (!passwordMatch) {
      throw new Error("Старый пароль не совпадает!");
    }

    await validPassword(newPassword);

    return await this.userRepository.changePassword(user, newPassword);
  }
}
