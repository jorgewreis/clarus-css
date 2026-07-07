import type * as ClarusNamespace from "./clarus.js";

declare global {
  const Clarus: typeof ClarusNamespace;

  interface Window {
    Clarus: typeof ClarusNamespace;
  }
}

export {};
