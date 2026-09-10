type CategoryFilterProps = {
  categories: readonly string[];
  active: string;
  onSelect: (category: string) => void;
};

export function CategoryFilter({
  categories,
  active,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`shrink-0 cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors sm:px-4 sm:py-2 sm:text-sm ${
              isActive
                ? "bg-demo-ink text-white"
                : "bg-demo-chip text-demo-ink hover:bg-demo-border"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
