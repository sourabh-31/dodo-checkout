import type { CheckoutMessage, SDKMessage } from "./protocol";

const CHECKOUT_URL = "http://localhost:5173";

type CheckoutOptions = {
  productId: string;

  onSuccess?: (data: { sessionId: string }) => void;

  onError?: (error: { code: string; message: string }) => void;

  onClose?: (data: { reason: "user" | "success" | "programmatic" }) => void;
};

let activeCheckout: {
  iframe: HTMLIFrameElement;
  instanceId: string;
  options: CheckoutOptions;
} | null = null;

function sendMessage(message: SDKMessage) {
  activeCheckout?.iframe.contentWindow?.postMessage(message, CHECKOUT_URL);
}

function cleanup() {
  if (!activeCheckout) {
    return;
  }

  window.removeEventListener("message", handleMessage);

  activeCheckout.iframe.remove();

  activeCheckout = null;
}

function handleMessage(event: MessageEvent) {
  if (!activeCheckout) {
    return;
  }

  // Make sure the message came from our checkout origin.
  if (event.origin !== CHECKOUT_URL) {
    return;
  }

  // Make sure it came from our specific iframe.
  if (event.source !== activeCheckout.iframe.contentWindow) {
    return;
  }

  const message = event.data as CheckoutMessage;

  // Ignore messages belonging to an old checkout instance.
  if (message.instanceId !== activeCheckout.instanceId) {
    return;
  }

  switch (message.type) {
    case "READY":
      sendMessage({
        source: "dodo-sdk",
        type: "INIT",
        instanceId: activeCheckout.instanceId,
        productId: activeCheckout.options.productId,
      });

      break;

    case "SUCCESS":
      activeCheckout.options.onSuccess?.({
        sessionId: message.sessionId,
      });

      break;

    case "ERROR":
      activeCheckout.options.onError?.({
        code: message.code,
        message: message.message,
      });

      break;

    case "CLOSED":
      activeCheckout.options.onClose?.({
        reason: message.reason,
      });

      cleanup();

      break;
  }
}

function open(options: CheckoutOptions) {
  // Don't allow two checkout instances at once.
  if (activeCheckout) {
    return;
  }

  const instanceId = crypto.randomUUID();

  const iframe = document.createElement("iframe");

  iframe.src = `${CHECKOUT_URL}?instanceId=${instanceId}`;

  iframe.style.position = "fixed";
  iframe.style.inset = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.style.zIndex = "999999";
  iframe.style.backgroundColor = "red";

  activeCheckout = {
    iframe,
    instanceId,
    options,
  };

  window.addEventListener("message", handleMessage);

  document.body.appendChild(iframe);
}

export const DodoCheckout = {
  open,
};
