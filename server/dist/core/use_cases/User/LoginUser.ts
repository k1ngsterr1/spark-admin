import bcryptjs from "bcryptjs";
import { IUserRepository } from "core/interfaces/IUserRepository";
import { IJWTService } from "core/interfaces/IJWTService";
import { JWTService } from "core/use_cases/User/JWTService";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { LoginRequest } from "@core/utils/User/Request";
import { ErrorDetails } from "@core/utils/utils";

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export class Login {
  private userRepository: IUserRepository;
  private jwtService: IJWTService;
  constructor() {
    this.userRepository = new UserRepository(); 
    this.jwtService = new JWTService();
  }

  async execute(request: LoginRequest, errors: ErrorDetails[]): Promise<{
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password } = request;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      errors.push(new ErrorDetails(404, "Не удалось найти пользователя."));
      return;
    }

    const isMatch: boolean = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      errors.push(new ErrorDetails(404, "Неверный пароль!"));
      return;
    }

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.generateAccessToken(userResponse);
    const refreshToken = this.jwtService.generateRefreshToken(userResponse);

    return { user: userResponse, accessToken, refreshToken };
  }
}