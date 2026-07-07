import { createElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Modal as ClarusModal } from "clarus-css/js/modal.js";

// Componente-fino: não reimplementa foco/overlay/teclado do Modal (já
// prontos em clarus-css/js/modal.js) — só instancia a classe vanilla sobre
// o botão-gatilho renderizado pelo React e desfaz a instância no unmount.
// Mesmo contrato de data-cl-target do uso declarativo (docs/components/modal.md),
// só que sem precisar de data-cl="modal" (o React chama `new Modal()` direto
// em vez de depender do auto-init por `data-cl`).
export const ModalTrigger = forwardRef(function ModalTrigger({ target, backdrop, children, ...rest }, ref) {
  const buttonRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    instanceRef.current = new ClarusModal(buttonRef.current, { backdrop });
    return () => instanceRef.current?.dispose();
  }, [backdrop]);

  useImperativeHandle(ref, () => ({
    show: () => instanceRef.current?.show(),
    hide: () => instanceRef.current?.hide(),
    toggle: () => instanceRef.current?.toggle(),
  }));

  return createElement("button", { type: "button", ref: buttonRef, "data-cl-target": target, ...rest }, children);
});

export function ModalPanel({ id, className = "", children, ...rest }) {
  return createElement(
    "div",
    { id, className: ["cl-modal", className].filter(Boolean).join(" "), ...rest },
    createElement("div", { className: "cl-modal-dialog" }, createElement("div", { className: "cl-modal-content" }, children)),
  );
}
