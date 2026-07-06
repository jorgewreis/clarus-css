const OPPOSITE_PLACEMENT = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

function fitsPlacement(placement, referenceRect, floatingRect, offset, viewportWidth, viewportHeight) {
  switch (placement) {
    case "top":
      return referenceRect.top - floatingRect.height - offset >= 0;
    case "bottom":
      return referenceRect.bottom + floatingRect.height + offset <= viewportHeight;
    case "left":
      return referenceRect.left - floatingRect.width - offset >= 0;
    case "right":
      return referenceRect.right + floatingRect.width + offset <= viewportWidth;
    default:
      return true;
  }
}

function alignCrossAxis(align, referenceStart, referenceSize, floatingSize) {
  switch (align) {
    case "start":
      return referenceStart;
    case "end":
      return referenceStart + referenceSize - floatingSize;
    default:
      return referenceStart + (referenceSize - floatingSize) / 2;
  }
}

export function computePosition(referenceEl, floatingEl, options = {}) {
  const { placement = "bottom", align = "center", offset = 8, padding = 8 } = options;

  const referenceRect = referenceEl.getBoundingClientRect();
  const floatingRect = floatingEl.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  let finalPlacement = placement;

  if (
    !fitsPlacement(placement, referenceRect, floatingRect, offset, viewportWidth, viewportHeight) &&
    fitsPlacement(OPPOSITE_PLACEMENT[placement], referenceRect, floatingRect, offset, viewportWidth, viewportHeight)
  ) {
    finalPlacement = OPPOSITE_PLACEMENT[placement];
  }

  let top;
  let left;

  if (finalPlacement === "top" || finalPlacement === "bottom") {
    top =
      finalPlacement === "top"
        ? referenceRect.top - floatingRect.height - offset
        : referenceRect.bottom + offset;
    left = alignCrossAxis(align, referenceRect.left, referenceRect.width, floatingRect.width);
  } else {
    left =
      finalPlacement === "left"
        ? referenceRect.left - floatingRect.width - offset
        : referenceRect.right + offset;
    top = alignCrossAxis(align, referenceRect.top, referenceRect.height, floatingRect.height);
  }

  left = Math.min(Math.max(left, padding), viewportWidth - floatingRect.width - padding);
  top = Math.min(Math.max(top, padding), viewportHeight - floatingRect.height - padding);

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
    placement: finalPlacement,
  };
}

export function applyPosition(floatingEl, position) {
  floatingEl.style.position = "absolute";
  floatingEl.style.top = `${position.top}px`;
  floatingEl.style.left = `${position.left}px`;
}
