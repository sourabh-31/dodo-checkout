"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import type { LogEntry } from "@/components/CallbackLog";
import { categories, products, type Product } from "@/data/products";

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery =
        query.length === 0 || product.name.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [search, category]);

  function addLog(fn: string, arg: string) {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });

    setLogs((current) =>
      [{ id: current.length + 1, time, fn, arg }, ...current].slice(0, 60),
    );
  }

  function handleBuy(product: Product) {
    addLog("onBuyNow", `${product.name}, ${product.price}`);

    window.DodoCheckout.open({
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
      <Navbar
        logs={logs}
        onClear={() => setLogs([])}
        search={search}
        onSearchChange={setSearch}
      />

      <main
        id="products"
        className="mt-3 rounded-2xl bg-white p-4 shadow-sm sm:mt-4 sm:rounded-3xl sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-semibold tracking-tight sm:text-2xl">
            {category === "All" ? "All products" : category}
          </h1>
        </div>

        <div className="mt-3 sm:mt-4">
          <CategoryFilter
            categories={categories}
            active={category}
            onSelect={setCategory}
          />
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={handleBuy}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-1 py-10 text-center">
            <span className="text-sm font-semibold text-demo-ink">
              No products found
            </span>
            <span className="text-xs text-gray-400 sm:text-sm">
              Try a different search term or category.
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
