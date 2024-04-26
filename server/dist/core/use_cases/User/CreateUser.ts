import { IUserRepository } from "core/interfaces/IUserRepository";
import { IEmailService } from "core/interfaces/IEmailService";
import { User } from "infrastructure/models/userModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { validEmail, validPassword } from "@core/utils/validators";
import EmailService from "./EmailVerification";
import { RegisterRequest } from "@core/utils/User/Request";

const verificationCodeGenerator = require("@core/utils/generateCode");

export class CreateUser {
  private userRepository: UserRepository;
  private emailService: IEmailService;
  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  async execute(request: RegisterRequest): Promise<User> {
    const { username, email, password, passwordConfirmation } = request;
    if (!email || !username || !password) {
      throw new Error("Заполните необходимые поля!");
    }

    if (password !== passwordConfirmation) {
      throw new Error("Пароли не совпадают!");
    }

    await validEmail(email);
    await validPassword(password);

    const code = verificationCodeGenerator(5);

    const newUser = await this.userRepository.create({
      username: username,
      email: email,
      password: password,
      verificationCode: code,
    });
    this.emailService.sendVerificationEmail(email, username, code);

    return newUser;
  }
}
