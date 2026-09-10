export function createBackdrop() {
  const backdrop = document.createElement("div");

  Object.assign(backdrop.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: "999998",
  });

  return backdrop;
}

export function createLoader() {
  const loader = document.createElement("div");

  Object.assign(loader.style, {
    position: "fixed",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000000",
    pointerEvents: "none",
  });

  loader.innerHTML = `
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 24px;
        font-family: system-ui, sans-serif;
      "
    >
      <div
        style="
          width: 28px;
          height: 28px;
          border: 3px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: dodo-sdk-spin 0.8s linear infinite;
        "
      ></div>

      <div
        style="
          color: white;
          font-size: 14px;
          font-weight: 500;
        "
      >
        Loading checkout...
      </div>
    </div>

    <style>
      @keyframes dodo-sdk-spin {
        to {
          transform: rotate(360deg);
        }
      }
    </style>
  `;

  return loader;
}

export function createLoadError() {
  const error = document.createElement("div");

  Object.assign(error.style, {
    position: "fixed",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000000",
    fontFamily: "system-ui, sans-serif",
  });

  error.innerHTML = `
    <div
      style="
        width: min(380px, calc(100vw - 32px));
        box-sizing: border-box;
        padding: 28px;
        border-radius: 16px;
        background: white;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      "
    >
      <div
        style="
          font-size: 16px;
          font-weight: 600;
          color: #111;
          margin-bottom: 8px;
        "
      >
        Checkout couldn't load
      </div>

      <div
        style="
          font-size: 14px;
          line-height: 1.5;
          color: #666;
          margin-bottom: 20px;
        "
      >
        Something went wrong while loading the checkout.
        Please try again.
      </div>

      <button
        type="button"
        data-dodo-retry
        style="
          width: 100%;
          border: 0;
          border-radius: 10px;
          padding: 12px 16px;
          background: #111;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        "
      >
        Try again
      </button>
    </div>
  `;

  return error;
}
