import { IJWTService } from "core/interfaces/IJWTService";
import jwt from "jsonwebtoken";

export class JWTService implements IJWTService {
  private accessTokenSecret = process.env.JWT_SECRET_ACCESS;
  private refreshTokenSecret = process.env.JWT_SECRET_REFRESH;

  generateAccessToken(user: {
    id: number;
    username: string;
    role: string;
  }): string {
    return jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      this.accessTokenSecret,
      { expiresIn: "1d" }
    );
  }

  generateRefreshToken(user: {
    id: number;
    username: string;
    role: string;
  }): string {
    return jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      this.refreshTokenSecret,
      { expiresIn: "7d" }
    );
  }
}
