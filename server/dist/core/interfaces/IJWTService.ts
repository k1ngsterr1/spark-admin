export interface IJWTService{
    generateAccessToken(user: {id:number, username: string, role: string}): string;
    generateRefreshToken(user: {id: number, username: string, role: string}): string;
}