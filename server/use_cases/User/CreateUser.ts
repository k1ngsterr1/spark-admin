import { IUserRepository } from '@interfaces/IUserRepositry';
import { IEmailService } from '@interfaces/IEmailService';
import { User } from '@models/userModel';

const verificationCodeGenerator = require("@utils/generateCode");

export class CreateUser {
    constructor(private userRepository: IUserRepository, private emailService: IEmailService) {}

    async execute({ username, email, password, passwordConfirmation }: {
        username: string,
        email: string,
        password: string,
        passwordConfirmation: string
      }): Promise<User> {
        if (!email || !username || !password){
          throw new Error('Заполните необходимые поля!')
        }

        if (password !== passwordConfirmation) {
          throw new Error('Пароли не совпадают!');
        }

        const code = verificationCodeGenerator(5)

        const newUser = await this.userRepository.create({
            username,
            email,
            password,
            verificationCode: code
        })

        this.emailService.sendVerificationEmail(email, username, code);

        return newUser
    }
}