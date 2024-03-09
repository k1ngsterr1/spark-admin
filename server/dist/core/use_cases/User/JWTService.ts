<<<<<<< HEAD
import { IJWTService } from "@core/interfaces/IJWTService";
import jwt from "jsonwebtoken";
import { UserPayload } from "@core/utils/types";
import { User } from "@infrastructure/models/userModel";
=======
import { IJWTService } from "core/interfaces/IJWTService";
import jwt from "jsonwebtoken";
>>>>>>> 4232f39e8b4e895dd8e4c45a4a5a08b47590b929

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
