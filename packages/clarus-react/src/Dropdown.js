import { createElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Dropdown as ClarusDropdown } from "clarus-css/js/dropdown.js";

// Mesmo padrão de Modal.js: instancia a classe vanilla sobre o
// botão-gatilho renderizado pelo React, sem reimplementar
// posicionamento/teclado/clique-fora (já prontos em clarus-css/js/dropdown.js).
export const DropdownTrigger = forwardRef(function DropdownTrigger({ target, placement, align, className = "", children, ...rest }, ref) {
  const buttonRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    instanceRef.current = new ClarusDropdown(buttonRef.current, { placement, align });
    return () => instanceRef.current?.dispose();
  }, [placement, align]);

  useImperativeHandle(ref, () => ({
    show: () => instanceRef.current?.show(),
    hide: () => instanceRef.current?.hide(),
    toggle: () => instanceRef.current?.toggle(),
  }));

  return createElement(
    "button",
    {
      type: "button",
      ref: buttonRef,
      className: ["cl-dropdown-toggle", className].filter(Boolean).join(" "),
      "data-cl-target": target,
      ...rest,
    },
    children,
  );
});

export function DropdownMenu({ id, className = "", children, ...rest }) {
  return createElement("div", { id, className: ["cl-dropdown-menu", className].filter(Boolean).join(" "), ...rest }, children);
}
