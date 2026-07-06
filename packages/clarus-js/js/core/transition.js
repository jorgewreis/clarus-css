function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function waitForHeightTransition(el) {
  return new Promise((resolve) => {
    const handleEnd = (event) => {
      if (event.target !== el || event.propertyName !== "height") return;
      el.removeEventListener("transitionend", handleEnd);
      resolve();
    };

    el.addEventListener("transitionend", handleEnd);
  });
}

export function collapse(el, options = {}) {
  if (prefersReducedMotion()) {
    el.style.display = "none";
    return Promise.resolve();
  }

  const duration = options.duration ?? 200;

  el.style.overflow = "hidden";
  el.style.height = `${el.scrollHeight}px`;
  el.style.transition = `height ${duration}ms ease`;

  const done = waitForHeightTransition(el).then(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition");
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = "0px";
    });
  });

  return done;
}

export function expand(el, options = {}) {
  el.style.display = "";

  if (prefersReducedMotion()) {
    return Promise.resolve();
  }

  const duration = options.duration ?? 200;
  const targetHeight = `${el.scrollHeight}px`;

  el.style.overflow = "hidden";
  el.style.height = "0px";
  el.style.transition = `height ${duration}ms ease`;

  const done = waitForHeightTransition(el).then(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition");
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = targetHeight;
    });
  });

  return done;
}

export function onTransitionEnd(el, propertyName) {
  return new Promise((resolve) => {
    const handleEnd = (event) => {
      if (event.target !== el) return;
      if (propertyName && event.propertyName !== propertyName) return;
      el.removeEventListener("transitionend", handleEnd);
      resolve();
    };

    el.addEventListener("transitionend", handleEnd);
  });
}
