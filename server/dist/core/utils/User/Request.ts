export type ChangeRoleRequest = {
    userId: number;
    newRole: string;
}
export type ChangePasswordRequest = {
    id: number,
    oldPassword: string,
    newPassword: string
}
export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}
export type LoginRequest = {
    email: string;
    password: string;
}