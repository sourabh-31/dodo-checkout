import Image from "next/image";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  onBuy: (product: Product) => void;
};

export function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-demo-border bg-white p-2 pb-3.5">
      <div className="relative flex aspect-[1/0.86] items-center justify-center overflow-hidden rounded-xl bg-demo-chip">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 px-1 font-semibold">{product.name}</h3>
      <div className="mt-1 px-1 text-sm font-medium text-gray-500">
        {product.price}
      </div>
      <button
        onClick={() => onBuy(product)}
        className="mt-3 w-full cursor-pointer rounded-xl bg-demo-ink px-3 py-2.5 text-sm font-bold tracking-normal text-white hover:opacity-90"
      >
        Buy now
      </button>
    </article>
  );
}
