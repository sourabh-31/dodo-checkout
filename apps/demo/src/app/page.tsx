"use client";

import { useState } from "react";
import { DodoCheckout } from "@dodo/checkout-sdk";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);

  function handleBuy() {
    setLogs((current) => [...current, "Opening checkout..."]);

    DodoCheckout.open({
      productId: "prod_premium",

      onSuccess: (data) => {
        setLogs((current) => [
          ...current,
          `Payment successful: ${data.sessionId}`,
        ]);
      },

      onError: (error) => {
        setLogs((current) => [...current, `Payment failed: ${error.message}`]);
      },

      onClose: (data) => {
        setLogs((current) => [...current, `Checkout closed: ${data.reason}`]);
      },
    });
  }

  return (
    <main>
      <section>
        <h1>My Store</h1>

        <div>
          <h2>Premium Product</h2>

          <p>₹999</p>

          <button
            onClick={handleBuy}
            className="border cursor-pointer bg-red-400"
          >
            Buy Now
          </button>
        </div>
      </section>

      <section>
        <h2>Callback Log</h2>

        {logs.length === 0 ? (
          <p>Waiting for checkout...</p>
        ) : (
          logs.map((log, index) => <p key={index}>{log}</p>)
        )}
      </section>
    </main>
  );
}
