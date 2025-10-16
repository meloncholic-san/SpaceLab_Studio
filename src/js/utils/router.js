import { initHeader } from "../components/header.js";
// import { initFooter } from "./components/footer/footer.js";
import { initMain } from "../pages/initMain.js";
import { loadComponent } from "./load-component.js";

const app = document.querySelector("#app");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

const routes = {
  "main": {
    file: "html/pages/main.html",
    init: initMain,
    layout: ["header", "footer"],
    headerClass: "header--main",
    footerClass: "footer--main",
  },
  // 
};

let currentCleanup = null;
let cleanupHeader = null;
let cleanupFooter = null;



async function loadPage(path) {
  const route = routes[path];

  //reset
  currentCleanup?.();
  cleanupHeader?.();
  cleanupFooter?.();

  currentCleanup = null;
  cleanupHeader = null;
  cleanupFooter = null;

  header.className = "";
  footer.className = "";

  //404
  if (!route) {
    app.innerHTML = "<h1>404 - Page not found</h1>";
    return;
  }

  //Loading page
  currentCleanup = await loadComponent(app, route.file, route.init);

  //Loading header
  if (route.layout.includes("header")) {
    cleanupHeader = await loadComponent(header, "html/components/header.html", initHeader);
      if (route.headerClass) {
      header.classList.add(route.headerClass);
    }
  } else {
    header.innerHTML = "";
  }

  //Loading footer
  if (route.layout.includes("footer")) {
    cleanupFooter = await loadComponent(footer, "html/components/footer.html", initFooter);
      if (route.footerClass) {
      footer.classList.add(route.footerClass);
    }
  } else {
    footer.innerHTML = "";
  }
}


function getCurrentPath() {
  return location.hash.slice(1) || "main";
}

export function initRouter() {
  window.addEventListener("hashchange", () => loadPage(getCurrentPath()));
  window.addEventListener("DOMContentLoaded", () => loadPage(getCurrentPath()));
}
