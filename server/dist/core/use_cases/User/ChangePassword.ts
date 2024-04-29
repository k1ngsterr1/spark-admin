import { ChangePasswordRequest } from "@core/utils/User/Request";
import { validPassword } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import EmailService from "./EmailVerification";
import { ErrorDetails } from "@core/utils/utils";

const verificationCodeGenerator = require("@core/utils/generateCode");

// Смена пароля
export class ChangePasswordService {
  private userRepository: UserRepository;
  private emailService: EmailService;
  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  // Инициация изменения пароля
  async initiatePasswordChange(userId: number): Promise<void> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new Error("Пользователь не найден.");
    }

    const verificationCode = verificationCodeGenerator(5);

    // Сохранение кода подтверждения
    await this.userRepository.saveVerificationCode(user, verificationCode);

    // Отправление кода подтверждения
    this.emailService.sendPasswordResetEmail(
      user.email,
      user.username,
      verificationCode
    );
  }

  // Основная логика смены пароля
  async execute(request: ChangePasswordRequest, errors: ErrorDetails[]): Promise<boolean> {
    const { id, oldPassword, newPassword, code } = request;
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      errors.push(new ErrorDetails(404, 'Не получилось найти пользователя'));
      return;
    }

    if(oldPassword === newPassword){
      errors.push(new ErrorDetails(400, "Старый пороль не должен совпадать с новым."));
      return;
    }

    // Проверка валидности пароля
    const isCodeValid = await this.userRepository.verifyCode(user, code);

    if (!isCodeValid) {
      errors.push(new ErrorDetails(400, "Неправильный или устаревший код!"));
      return;
    }

    const isValidPass = await validPassword(newPassword, errors);
    if(!isValidPass){
      return;
    }

    return await this.userRepository.changePassword(user, newPassword);
  }
}
