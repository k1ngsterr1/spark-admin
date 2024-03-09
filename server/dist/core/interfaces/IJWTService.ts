<<<<<<< HEAD
import { UserPayload, UserResponse } from "@core/utils/types";
=======
import { UserResponse } from "@core/use_cases/User/LoginUser";
>>>>>>> 4232f39e8b4e895dd8e4c45a4a5a08b47590b929

export interface IJWTService {
  generateAccessToken(user: UserResponse): string;
  generateRefreshToken(user: UserResponse): string;
<<<<<<< HEAD
  getAccessPayload(token: string): UserPayload;
  getRefreshPayload(token: string): UserPayload;
}
=======
}
>>>>>>> 4232f39e8b4e895dd8e4c45a4a5a08b47590b929
