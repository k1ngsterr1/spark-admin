import { IJWTService } from "@core/interfaces/IJWTService";
import { UserPayload } from "@core/utils/types";
import { User } from "@infrastructure/models/userModel";
import jwt from "jsonwebtoken";

export class JWTService implements IJWTService {
  private accessTokenSecret = process.env.JWT_SECRET_ACCESS;
  private refreshTokenSecret = process.env.JWT_SECRET_REFRESH;

  generateAccessToken(user: {
    id: number;
    email: string;
    role: string;
  }): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.accessTokenSecret,
      { expiresIn: "1d" }
    );
  }

  generateRefreshToken(user: {
    id: number;
    email: string;
    role: string;
  }): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.refreshTokenSecret,
      { expiresIn: "7d" }
    );
  }

  getAccessPayload(token: string): UserPayload{
    try{
      return jwt.verify(token, this.accessTokenSecret);
    } catch(error){
      console.log("Could not get access token payload");
    }
  }

  getRefreshPayload(token: string): UserPayload{
    try{
      return jwt.verify(token, this.refreshTokenSecret);
    } catch(error){
      console.log("Could not get refresh token payload");
    }    
  }

}
