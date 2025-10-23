import { initMain } from "../pages/initMain.js";
import { initHeader } from "../components/init-header.js";
import { initAbout } from "../pages/init-about.js";
import { initNews } from "../pages/init-news.js";
import { initOneNews } from "../pages/init-one-news.js";
import { initOneProject } from "../pages/init-one-project.js";
import { initProjects } from "../pages/init-projects.js";
document.addEventListener("DOMContentLoaded", () => {

    initHeader();
    if (document.body.id === "main-page") {
        initMain();
    } 
    if (document.body.id === "about-page") {
        initAbout();
    } 
    if (document.body.id === "news-page") {
        initNews();
    }
    if (document.body.id === "one-news-page") {
        initOneNews();   
    }
    if (document.body.id === "one-project-page") {
        initOneProject();
    }
    if (document.body.id === "projects-page") {
        initProjects();
    }
});
