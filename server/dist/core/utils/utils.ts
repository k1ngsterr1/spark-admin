// Класс для вывода ошибок
export class ErrorDetails {
  public code: number | string;
  public details: string;
  constructor(code: number, details: string) {
    this.code = code;
    this.details = details;
  }
}

// Класс для вывода элементов
export class ElementDetails {
  public buttons: string[];
  public paragraphs: string[];
  public headers: string[];

  constructor(
    buttons: string[] = [],
    paragraphs: string[] = [],
    headers: string[] = []
  ) {
    this.buttons = buttons;
    this.paragraphs = paragraphs;
    this.headers = headers;
  }
}
