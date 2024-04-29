import { ErrorDetails } from "../utils";

export type ChangeRoleRequest = {
  userId: number;
  newRole: string;
};
export type ChangePasswordRequest = {
  id: number;
  newPassword: string;
  code: string;
};
export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type VerifyRequest = {
  id: number;
  code: string;
};
