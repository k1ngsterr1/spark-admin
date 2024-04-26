import { User } from "@infrastructure/models/userModel";
import { UserRole, WebsiteCommand } from "./types";
import validator from "validator";

export async function validEmail(email: string): Promise<boolean> {
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

// Проверка валидности пароля
export async function validPassword(password: string): Promise<boolean> {
  if (!validator.isLength(password, { min: 8, max: 16 })) {
    throw new Error("Длина пароля должна быть от 8 до 16 символов");
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(password)) {
    throw new Error("Пароль должен содержать хотя бы один специальный символ");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Пароль должен содержать хотя бы одну заглавную букву");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Пароль должен содержать хотя бы одну строчную букву");
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
      protocols: ["https"],
      require_valid_protocol: true,
      validate_length: true,
      allow_underscores: false,
    })
  ) {
    return true;
  }
  return false;
}

// Проверка валидности юзера веб-сайта
export async function validWebsiteUser(
  user: User,
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
