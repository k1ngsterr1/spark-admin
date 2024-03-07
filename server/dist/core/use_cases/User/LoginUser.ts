import bcryptjs from "bcryptjs";
import { IUserRepository } from "core/interfaces/IUserRepositry";
import { IJWTService } from "core/interfaces/IJWTService";
import { JWTService } from "./JWTService";

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJWTService
  ) {}

  async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Пользователь не найден!");
    }

    const isMatch: boolean = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Неверный пароль!");
    }

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    console.log(this.userRepository);

    const accessToken = this.jwtService.generateAccessToken(userResponse);
    const refreshToken = this.jwtService.generateRefreshToken(userResponse);

    return { user: userResponse, accessToken, refreshToken };
  }
}
