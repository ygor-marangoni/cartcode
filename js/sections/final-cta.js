export function initFinalCta() {
  const form = document.querySelector("[data-final-cta-form]");
  const feedback = document.querySelector("[data-final-cta-feedback]");

  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    feedback.textContent = "Recebido! Vamos entrar em contato em breve.";
    feedback.classList.add("is-visible");
    form.reset();
  });
}
