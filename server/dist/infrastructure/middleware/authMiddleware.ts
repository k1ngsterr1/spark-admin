import { JWTService } from "@core/use_cases/User/JWTService";
import { UserPayload } from "@core/utils/types";

export default function authenticateToken(req, res, next){
  const jwtService = new JWTService();
  if(req.cookies.refreshToken === undefined){
    res.status(403).json({ message: "Login Required!"});
    throw new Error("Login Required");
  }
  const payload = jwtService.getRefreshPayload(req.cookies.refreshToken);
  const user: UserPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role
  }
  res.cookie('access', jwtService.generateAccessToken(user), { maxAge: process.env.ACCESS_COOKIE_LIFETIME, httpOnly: true });
  next();
}