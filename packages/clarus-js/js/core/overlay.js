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

  // Listener de captura registrado imediatamente: o clique que abriu o
  // elemento já passou pelo document na fase de captura, então não dispara
  // o fechamento — e um clique fora logo em seguida já encontra o listener
  // ativo (adiar com setTimeout criava uma janela em que ele era perdido).
  document.addEventListener("click", handler, true);

  return () => {
    document.removeEventListener("click", handler, true);
  };
}
