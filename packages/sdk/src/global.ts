import { DodoCheckout } from "./index";

declare global {
  interface Window {
    DodoCheckout: typeof DodoCheckout;
  }
}

window.DodoCheckout = DodoCheckout;
