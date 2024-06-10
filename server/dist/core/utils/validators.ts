import { User } from "@infrastructure/models/userModel";
import { Website } from "@infrastructure/models/websiteModel";
import validator from "validator";
import { UserRole, WebsiteCommand } from "./types";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { ErrorDetails } from "./utils";

// Валидация почты
export async function validEmail(email: string): Promise<boolean> {
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

// Валидация пароля
export async function validPassword(password: string, errors: ErrorDetails[]): Promise<boolean> {
  if (!validator.isLength(password, { min: 8, max: 16 })) {
    errors.push(new ErrorDetails(400, "Длина пароля должна быть от 8 до 16 символов"));
    return false;
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password)) {
    errors.push(new ErrorDetails(400, "Пароль должен содержать хотя бы один специальный символ"));
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    errors.push(new ErrorDetails(400, "Пароль должен содержать хотя бы одну заглавную букву"));
    return false;
  }
  if (!/[a-z]/.test(password)) {
    errors.push(new ErrorDetails(400, "Пароль должен содержать хотя бы одну строчную букву"));
    return false;
  }
  return true;
}

// Проверка валидности URL
export async function validURL(url: string): Promise<boolean> {
  if (!url) {
    return false;
  }
  if (
    validator.isURL(url, {
      protocols: ["https", "http"],
      require_valid_protocol: true,
      validate_length: true,
      allow_underscores: false,
      require_host: false,
      require_tld: false
    })
  ) {
    return true;
  }
  return false;
}

// Валидация веб-сайт юзера
export async function validWebsiteUser(
  user: UserToWebsite,
  command: string
): Promise<boolean> {
  if (user.isSparkAdmin === true) {
    return true;
  }
  if (command == WebsiteCommand.update) {
    return (
      user.role === UserRole.Editor ||
      user.role === UserRole.Owner ||
      user.role === UserRole.Admin
    );
  }
  if (command == WebsiteCommand.delete) {
    return user.role === UserRole.Owner;
  }
  return true;
}
