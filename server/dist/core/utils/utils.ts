export class ErrorDetails {
    public code: number;
    public details: string;
    constructor(code: number, details: string) {
        this.code = code;
        this.details = details;
    }
}
export class ElementDetails {
    public buttons: string[];
    constructor(buttons: string[]) {
        this.buttons = buttons;
    }
}