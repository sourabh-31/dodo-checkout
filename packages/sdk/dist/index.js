const CHECKOUT_URL = "http://localhost:5173";
let activeCheckout = null;
function sendMessage(message) {
    activeCheckout?.iframe.contentWindow?.postMessage(message, CHECKOUT_URL);
}
function cleanup() {
    if (!activeCheckout) {
        return;
    }
    window.removeEventListener("message", handleMessage);
    activeCheckout.iframe.remove();
    activeCheckout.backdrop.remove();
    activeCheckout = null;
}
function handleMessage(event) {
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
    const message = event.data;
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
function open(options) {
    // Don't allow two checkout instances at once.
    if (activeCheckout) {
        return;
    }
    const instanceId = crypto.randomUUID();
    const backdrop = document.createElement("div");
    const iframe = document.createElement("iframe");
    const params = new URLSearchParams({
        instanceId,
        productId: options.productId,
        origin: window.location.origin,
    });
    // Backdrop
    Object.assign(backdrop.style, {
        position: "fixed",
        inset: "0",
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: "999998",
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
    });
    activeCheckout = {
        iframe,
        backdrop,
        instanceId,
        options,
    };
    window.addEventListener("message", handleMessage);
    document.body.appendChild(backdrop);
    document.body.appendChild(iframe);
}
export const DodoCheckout = {
    open,
};
