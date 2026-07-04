let lockCount = 0;
let paddingCompensated = false;

export function lockScroll() {
  lockCount += 1;
  if (lockCount > 1) return;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    paddingCompensated = true;
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;

  document.body.style.overflow = "";

  if (paddingCompensated) {
    document.body.style.paddingRight = "";
    paddingCompensated = false;
  }
}

export function onClickOutside(el, callback) {
  const handler = (event) => {
    if (!el.contains(event.target)) callback(event);
  };

  // Adiado para o próximo tick: evita que o mesmo clique que abriu o
  // elemento (ainda em bubbling até o document) já dispare o fechamento.
  const timerId = setTimeout(() => document.addEventListener("click", handler, true));

  return () => {
    clearTimeout(timerId);
    document.removeEventListener("click", handler, true);
  };
}
