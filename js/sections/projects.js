export function initProjects() {
  const track = document.querySelector("[data-project-track]");
  const prev = document.querySelector("[data-project-prev]");
  const next = document.querySelector("[data-project-next]");
  if (!track || !prev || !next) return;

  const getStep = () => {
    const card = track.querySelector(".project-card");
    if (!card) return 360;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 18;
    return card.getBoundingClientRect().width + gap;
  };

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep(), behavior: "smooth" });
  });
}
