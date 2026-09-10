"use client";

import { useState } from "react";
import { DodoCheckout } from "@dodo/checkout-sdk";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import type { LogEntry } from "@/components/CallbackLog";
import { products, type Product } from "@/data/products";

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  function addLog(fn: string, arg: string) {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });

    setLogs((current) =>
      [{ id: current.length + 1, time, fn, arg }, ...current].slice(0, 60),
    );
  }

  function handleBuy(product: Product) {
    addLog("onBuyNow", `${product.name}, ${product.price}`);

    DodoCheckout.open({
      productId: product.id,

      onSuccess: (data) => {
        addLog("onSuccess", data.sessionId);
      },

      onError: (error) => {
        addLog("onError", error.message);
      },

      onClose: (data) => {
        addLog("onClose", data.reason);
      },
    });
  }

  return (
    <div className="bg-demo-bg p-3 sm:p-4">
      <Navbar logs={logs} onClear={() => setLogs([])} />

      <main className="mt-3 rounded-2xl bg-white p-4 shadow-sm sm:mt-4 sm:rounded-3xl sm:p-6">
        <h1 className="text-lg font-semibold tracking-tight sm:text-2xl">Products</h1>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={handleBuy} />
          ))}
        </div>
      </main>
    </div>
  );
}
