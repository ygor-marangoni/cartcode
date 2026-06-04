export function initFaq() {
  const list = document.querySelector("[data-faq-list]");
  if (!list) return;

  const items = [...list.querySelectorAll(".faq-item")];

  items.forEach((item) => {
    const button = item.querySelector("button");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((entry) => {
        entry.classList.remove("is-open");
        entry.querySelector("button")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}
