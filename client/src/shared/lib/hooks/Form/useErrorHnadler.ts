// createErrorHandler.ts
export type ErrorCodes = 'AMOUNT_OF_SYMBOLS' | 'CAPITAL_LETTER' | 'SMALL_LETTER' | 'ONE_NUMBER' | 'ONE_SPECIAL_SYMBOL' | 'PASSWORDS_NOT_MATCH' | 'EMAIL_FORMAT';

export type SetErrorFunction = (field: string, message: string) => void;

export const createErrorHandler = (setError: SetErrorFunction) => {
    const errorMessages: Record<ErrorCodes, string> = {
        AMOUNT_OF_SYMBOLS: 'Пароль должен содержать от 8 до 16 символов',
        CAPITAL_LETTER: 'Пароль должен содержать хотя бы одну заглавную букву',
        SMALL_LETTER: 'Пароль должен содержать хотя бы одну маленькую букву',
        ONE_NUMBER: 'Пароль должен содержать хотя бы одну цифру',
        ONE_SPECIAL_SYMBOL: 'Пароль должен содержать хотя бы один специальный символ',
        PASSWORDS_NOT_MATCH: 'Пароли не совпадают',
        EMAIL_FORMAT: 'Неверный формат email',
    };

    return (field: string, errorCode: ErrorCodes) => {
        const message = errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
        setError(field, message);
    };
};
