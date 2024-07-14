import { IEmailService } from "core/interfaces/IEmailService";
import { User } from "infrastructure/models/userModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { validEmail, validPassword } from "@core/utils/validators";
import EmailService from "./EmailVerification";
import { RegisterRequest } from "@core/utils/User/Request";
import { ErrorDetails } from "@core/utils/utils";
import { generateVerificationCode } from "@core/utils/generateCode";

export class CreateUser {
  private userRepository: UserRepository;
  private emailService: IEmailService;
  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  async execute(
    request: RegisterRequest,
    errors: ErrorDetails[]
  ): Promise<User> {
    const { username, email, password, passwordConfirmation } = request;

    if (!email || !username || !password) {
      errors.push(new ErrorDetails(400, "Заполните необходимые поля!"));
      return;
    }

    if (password !== passwordConfirmation) {
      errors.push(new ErrorDetails(400, "Пароли не совпадают!"));
      return;
    }

    const isValidEmail = await validEmail(email);
    const isValidPass = await validPassword(password, errors);

    if (!isValidEmail) {
      errors.push(new ErrorDetails(400, "Неверный адрес электронной почты."));
      return;
    }
    if (!isValidPass) {
      return;
    }

    const code = generateVerificationCode(5);

    const newUser = await this.userRepository.create({
      username: username,
      email: email,
      password: password,
    });

    await this.userRepository.saveVerificationCode(newUser, code);

    await this.emailService.sendVerificationEmail(email, username, code);

    return newUser;
  }
}
