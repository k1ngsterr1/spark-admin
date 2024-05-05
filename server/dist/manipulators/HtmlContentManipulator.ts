import { JSDOM } from "jsdom";
import { IContentManipulator } from "@core/interfaces/IContentManipulator";

// Манипуляции с HTML
export class HtmlContentManipulator implements IContentManipulator {
  manipulate(content: string): string {
    const dom = new JSDOM(content);
    const document = dom.window.document;

    document.querySelectorAll("h1").forEach((h) => {
      const input = document.createElement("input");
      input.type = "text";
      input.style.width = "100%";
      input.value = h.textContent || "";
      h.replaceWith(input);
    });

    document.querySelectorAll("p").forEach((p) => {
      const textarea = document.createElement("textarea");
      textarea.style.width = "100%";
      textarea.rows = 4;
      textarea.textContent = p.textContent || "";
      p.replaceWith(textarea);
    });

    return dom.serialize();
  }
}
