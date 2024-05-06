import { JSDOM } from "jsdom";

// Корректируем пути к стилям и скриптам
export function adjustAssetPaths(html: string, baseUrl: string) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => {
    link.href = new URL(link.href, baseUrl).href;
  });

  const scripts = document.querySelectorAll("script[src]");
  scripts.forEach((script) => {
    script.src = new URL(script.src, baseUrl).href;
  });

  const images = document.querySelectorAll("img[src]");
  images.forEach((img) => {
    img.src = new URL(img.src, baseUrl).href;
  });

  return dom.serialize();
}
