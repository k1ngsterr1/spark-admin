export class ErrorDetails {
    public code: number;
    public details: string;
    constructor(code: number, details: string) {
        this.code = code;
        this.details = details;
    }
}