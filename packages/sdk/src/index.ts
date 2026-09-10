import type { CheckoutMessage, SDKMessage } from "./protocol";
import { createBackdrop, createLoader, createLoadError } from "./loader";

const CHECKOUT_URL = "https://super-sea-964a.sourabhhaldarh.workers.dev";

const READY_TIMEOUT = 10_000;

// Delay before showing the loader, so a fast READY doesn't cause a flash/glitch.
const LOADER_DELAY = 150;

type CheckoutOptions = {
  productId: string;
  onSuccess?: (data: { sessionId: string }) => void;
  onError?: (error: { code: string; message: string }) => void;
  onClose?: (data: { reason: "user" | "success" | "programmatic" }) => void;
};

let activeCheckout: {
  iframe: HTMLIFrameElement;
  backdrop: HTMLDivElement;
  loader: HTMLDivElement;
  instanceId: string;
  options: CheckoutOptions;
  readyTimeout: ReturnType<typeof setTimeout>;
  loaderTimeout: ReturnType<typeof setTimeout>;
} | null = null;

let previousBodyOverflow: string | null = null;

function lockPageScroll() {
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}

function unlockPageScroll() {
  document.body.style.overflow = previousBodyOverflow ?? "";
  previousBodyOverflow = null;
}

function sendMessage(message: SDKMessage) {
  activeCheckout?.iframe.contentWindow?.postMessage(message, CHECKOUT_URL);
}

function cleanup() {
  if (!activeCheckout) {
    return;
  }

  clearTimeout(activeCheckout.readyTimeout);
  clearTimeout(activeCheckout.loaderTimeout);

  window.removeEventListener("message", handleMessage);

  activeCheckout.iframe.remove();
  activeCheckout.backdrop.remove();
  activeCheckout.loader.remove();

  activeCheckout = null;

  unlockPageScroll();
}

function handleLoadTimeout() {
  if (!activeCheckout) {
    return;
  }

  const options = activeCheckout.options;

  cleanup();

  const backdrop = createBackdrop();
  const errorView = createLoadError();

  const retryButton =
    errorView.querySelector<HTMLButtonElement>("[data-dodo-retry]");

  retryButton?.addEventListener("click", () => {
    backdrop.remove();
    errorView.remove();

    open(options);
  });

  document.body.appendChild(backdrop);
  document.body.appendChild(errorView);
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
    case "READY": {
      clearTimeout(activeCheckout.readyTimeout);
      clearTimeout(activeCheckout.loaderTimeout);

      activeCheckout.loader.remove();

      activeCheckout.iframe.style.visibility = "visible";

      activeCheckout.iframe.focus();

      sendMessage({
        source: "dodo-sdk",
        type: "INIT",
        instanceId: activeCheckout.instanceId,
        productId: activeCheckout.options.productId,
      });

      break;
    }

    case "SUCCESS": {
      activeCheckout.options.onSuccess?.({
        sessionId: message.sessionId,
      });

      break;
    }

    case "ERROR": {
      activeCheckout.options.onError?.({
        code: message.code,
        message: message.message,
      });

      break;
    }

    case "CLOSED": {
      activeCheckout.options.onClose?.({
        reason: message.reason,
      });

      cleanup();

      break;
    }
  }
}

function open(options: CheckoutOptions) {
  // Don't allow two checkout instances at once.
  if (activeCheckout) {
    return;
  }

  const instanceId = crypto.randomUUID();

  const backdrop = createBackdrop();
  const loader = createLoader();
  const iframe = document.createElement("iframe");

  const params = new URLSearchParams({
    instanceId,
    productId: options.productId,
    origin: window.location.origin,
  });

  // Checkout iframe
  iframe.src = `${CHECKOUT_URL}?${params.toString()}`;

  Object.assign(iframe.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    border: "0",
    background: "transparent",
    zIndex: "999999",

    // Keep iframe hidden until checkout sends READY.
    visibility: "hidden",
  });

  const readyTimeout = setTimeout(() => {
    handleLoadTimeout();
  }, READY_TIMEOUT);

  const loaderTimeout = setTimeout(() => {
    document.body.appendChild(loader);
  }, LOADER_DELAY);

  activeCheckout = {
    iframe,
    backdrop,
    loader,
    instanceId,
    options,
    readyTimeout,
    loaderTimeout,
  };

  window.addEventListener("message", handleMessage);

  lockPageScroll();

  document.body.appendChild(backdrop);
  document.body.appendChild(iframe);
}

export const DodoCheckout = {
  open,
};
