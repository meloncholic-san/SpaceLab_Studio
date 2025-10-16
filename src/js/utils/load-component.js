import { loadHTML } from "./load-html.js";

export async function loadComponent(container, htmlPath, jsInit) {
  await loadHTML(container, htmlPath);
  if (typeof jsInit === "function") {
    return jsInit(container);
  }
  return null;
}
