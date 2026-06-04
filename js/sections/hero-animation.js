export function initHeroAnimation() {
  const nodes = [...document.querySelectorAll("[data-hero-node]")];
  const typingWord = document.querySelector("[data-typing-word]");

  let index = 0;
  let intervalId = null;

  const activate = () => {
    if (!nodes.length) return;
    nodes.forEach((node) => node.classList.remove("is-active"));
    nodes[index]?.classList.add("is-active");
    index = (index + 1) % nodes.length;
  };

  const start = () => {
    if (!intervalId) intervalId = window.setInterval(activate, 1200);
  };

  const stop = () => {
    if (!intervalId) return;
    window.clearInterval(intervalId);
    intervalId = null;
  };

  if (nodes.length) {
    activate();
    start();
  }

  if (typingWord) {
    const words = ["marcas", "empresas", "lojas", "comércios", "negócios"];
    let wordIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    const render = () => {
      typingWord.textContent = words[wordIndex].slice(0, characterIndex);
    };

    const type = () => {
      render();

      if (!isDeleting && characterIndex < words[wordIndex].length) {
        characterIndex += 1;
        window.setTimeout(type, 82);
        return;
      }

      if (!isDeleting) {
        isDeleting = true;
        window.setTimeout(type, 1800);
        return;
      }

      if (characterIndex > 0) {
        characterIndex -= 1;
        window.setTimeout(type, 54);
        return;
      }

      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      window.setTimeout(type, 220);
    };

    typingWord.textContent = "";
    window.requestAnimationFrame(() => {
      typingWord.classList.add("is-ready");
      type();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
}
