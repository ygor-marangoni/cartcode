export function initStoreTypes() {
  const section = document.querySelector(".solutions-moments");
  if (!section) return;

  const viewport = section.querySelector(".solutions-moments__viewport");
  const track = section.querySelector(".solutions-moments__track");
  const cards = [...section.querySelectorAll(".solutions-moments__card")];
  const prevButton = section.querySelector("[data-moment-prev]");
  const nextButton = section.querySelector("[data-moment-next]");
  const count = section.querySelector(".solutions-moments__count");
  const progress = section.querySelector(".solutions-moments__progress-fill");

  if (!viewport || !track || !cards.length) return;

  section.classList.remove("is-gsap");

  let activeIndex = 0;
  let resizeTimer = null;
  let isResizing = false;

  const getTrackPaddingLeft = () => parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
  const getCardLeft = (index) => cards[index].offsetLeft - track.offsetLeft - getTrackPaddingLeft();

  const setProgress = () => {
    const maxScroll = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
    const value = viewport.scrollLeft / maxScroll;
    if (progress) {
      progress.style.transform = `scaleX(${Math.min(Math.max(value, 0), 1)})`;
    }
  };

  const setControls = () => {
    activeIndex = Math.min(Math.max(activeIndex, 0), cards.length - 1);

    if (count) {
      count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    }

    if (prevButton) prevButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex === cards.length - 1;
    setProgress();
  };

  const setActiveIndexFromScroll = () => {
    const current = viewport.scrollLeft;
    activeIndex = cards.reduce((closestIndex, _card, index) => {
      const closestDistance = Math.abs(current - getCardLeft(closestIndex));
      const cardDistance = Math.abs(current - getCardLeft(index));
      return cardDistance < closestDistance ? index : closestIndex;
    }, 0);

    setControls();
  };

  const goToCard = (index) => {
    const nextIndex = Math.min(Math.max(index, 0), cards.length - 1);
    activeIndex = nextIndex;
    setControls();
    viewport.scrollTo({
      left: getCardLeft(nextIndex),
      behavior: "smooth"
    });
  };

  prevButton?.addEventListener("click", () => goToCard(activeIndex - 1));
  nextButton?.addEventListener("click", () => goToCard(activeIndex + 1));
  viewport.addEventListener("scroll", () => {
    if (!isResizing) {
      setActiveIndexFromScroll();
    }
  }, { passive: true });

  const realignActiveCard = () => {
    isResizing = true;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        viewport.scrollTo({
          left: getCardLeft(activeIndex),
          behavior: "auto"
        });

        requestAnimationFrame(() => {
          isResizing = false;
          setActiveIndexFromScroll();
        });
      });
    }, 120);
  };

  window.addEventListener("resize", realignActiveCard, { passive: true });
  window.addEventListener("orientationchange", realignActiveCard, { passive: true });

  viewport.scrollTo({ left: 0, behavior: "auto" });
  setControls();

  window.addEventListener("load", () => {
    viewport.scrollTo({ left: 0, behavior: "auto" });
    setActiveIndexFromScroll();
  }, { once: true });
}
