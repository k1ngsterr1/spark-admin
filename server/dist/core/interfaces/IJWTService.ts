import { UserResponse } from "@core/use_cases/User/LoginUser";

export interface IJWTService {
  generateAccessToken(user: UserResponse): string;
  generateRefreshToken(user: UserResponse): string;
}
