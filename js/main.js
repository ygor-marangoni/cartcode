import { initHeader } from "./sections/header.js";
import { initHeroAnimation } from "./sections/hero-animation.js";
import { initProcess } from "./sections/process.js";
import { initProjects } from "./sections/projects.js";
import { initFaq } from "./sections/faq.js";
import { initScrollReveal } from "./sections/scroll-reveal.js";

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    window.addEventListener("load", () => window.lucide?.createIcons(), { once: true });
  }
}

function init() {
  initIcons();
  initHeader();
  initHeroAnimation();
  initProcess();
  initProjects();
  initFaq();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
