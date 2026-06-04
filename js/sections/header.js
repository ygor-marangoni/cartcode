export function initHeader() {
  const header = document.querySelector("[data-header]");
  const logo = document.querySelector("[data-logo]");
  const toggle = document.querySelector("[data-mobile-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const navLinks = document.querySelectorAll(".desktop-nav a");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const setScrolled = () => {
    const currentScrollY = window.scrollY;
    const wasScrolled = header.classList.contains("is-scrolled");
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    const enterAt = isMobile ? 36 : 28;
    const exitAt = isMobile ? 10 : 4;
    const isScrolled = wasScrolled ? currentScrollY > exitAt : currentScrollY > enterAt;

    header.classList.toggle("is-scrolled", isScrolled);
    if (logo) {
      const isMenuOpen = header.classList.contains("menu-open");
      logo.src = isScrolled || isMenuOpen ? logo.dataset.logoScrolled : logo.dataset.logoTop;
    }
  };

  const updateVisibility = () => {
    const currentScrollY = window.scrollY;
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    const isMenuOpen = header.classList.contains("menu-open");
    const scrollingDown = currentScrollY > lastScrollY;
    const movedEnough = Math.abs(currentScrollY - lastScrollY) > 16;

    if (!isMobile) {
      header.classList.remove("is-hidden");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY < 170 || isMenuOpen) {
      header.classList.remove("is-hidden");
    } else if (movedEnough && scrollingDown) {
      header.classList.add("is-hidden");
    } else if (movedEnough) {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
  };

  const closeMenu = () => {
    header.classList.remove("menu-open");
    header.classList.remove("is-hidden");
    document.body.classList.remove("menu-locked");
    toggle?.setAttribute("aria-expanded", "false");
    setScrolled();
  };

  const updateActive = () => {
    let current = sections[0]?.id;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140) current = section.id;
    }
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };

  setScrolled();
  updateVisibility();
  updateActive();

  const onScroll = () => {
    setScrolled();
    updateVisibility();
    updateActive();
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    header.classList.remove("is-hidden");
    document.body.classList.toggle("menu-locked", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    setScrolled();
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
