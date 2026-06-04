export function initProcess() {
  const cards = [...document.querySelectorAll("[data-process-card]")];
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((item) => item.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cards[0]?.classList.add("is-active");
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(cards[0]);
}
