import Image from "next/image";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  onBuy: (product: Product) => void;
};

export function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-demo-border bg-white p-1.5 pb-2.5 sm:rounded-2xl sm:p-2 sm:pb-3.5">
      <div className="relative flex aspect-[1/0.86] items-center justify-center overflow-hidden rounded-lg bg-demo-chip sm:rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          loading="eager"
        />
      </div>
      <h3 className="mt-2 px-1 text-sm font-semibold sm:mt-3 sm:text-base">
        {product.name}
      </h3>
      <div className="mt-0.5 px-1 text-xs font-medium text-gray-500 sm:mt-1 sm:text-sm">
        {product.price}
      </div>
      <button
        onClick={() => onBuy(product)}
        className="mt-2 w-full cursor-pointer rounded-lg bg-demo-ink px-3 py-2 text-xs font-bold tracking-normal text-white hover:opacity-90 sm:mt-3 sm:rounded-xl sm:py-2.5 sm:text-sm"
      >
        Buy now
      </button>
    </article>
  );
}
