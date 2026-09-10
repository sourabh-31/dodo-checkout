import Image from "next/image";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  onBuy: (product: Product) => void;
};

const BADGE_STYLE: Record<string, string> = {
  Bestseller: "bg-demo-ink text-white",
  New: "bg-demo-accent text-white",
  Sale: "bg-rose-600 text-white",
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
        {product.badge && (
          <span
            className={`absolute top-1.5 left-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide sm:top-2 sm:left-2 sm:px-2 sm:py-1 sm:text-xs ${BADGE_STYLE[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-2 px-1 text-[10px] font-semibold tracking-wide text-demo-muted-icon uppercase sm:mt-3 sm:text-xs">
        {product.category}
      </div>
      <h3 className="mt-0.5 px-1 text-sm font-semibold sm:text-base">
        {product.name}
      </h3>

      <div className="mt-1 flex items-center gap-1 px-1">
        <svg viewBox="0 0 20 20" className="h-3 w-3 fill-amber-400 sm:h-3.5 sm:w-3.5">
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.9l-5.18 2.55.99-5.77-4.19-4.09 5.79-.84L10 1.5z" />
        </svg>
        <span className="text-xs font-semibold text-demo-ink sm:text-sm">
          {product.rating.toFixed(1)}
        </span>
        <span className="text-[10px] text-gray-400 sm:text-xs">
          ({product.reviewCount})
        </span>
      </div>

      <div className="mt-1 flex items-baseline gap-1.5 px-1 sm:mt-1.5">
        <span className="text-xs font-medium text-gray-500 sm:text-sm">
          {product.price}
        </span>
        {product.originalPrice && (
          <span className="text-[10px] text-gray-400 line-through sm:text-xs">
            {product.originalPrice}
          </span>
        )}
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
