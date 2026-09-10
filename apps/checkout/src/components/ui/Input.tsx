import type { InputHTMLAttributes } from "react";

type InputVariant = "card" | "email";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label: string;
}

const BASE_CLASSES =
  "w-full min-w-0 border-none outline-none bg-transparent text-[14px] text-text-primary tabular-nums disabled:cursor-not-allowed";

const VARIANTS: Record<InputVariant, string> = {
  card: "p-[14px_16px] font-medium tracking-[-0.006em]",
  email: "py-3 px-0 text-right font-semibold tracking-[-0.008em]",
};

export default function Input({
  variant = "card",
  label,
  className,
  ...props
}: InputProps) {
  return (
    <input
      aria-label={label}
      className={`${BASE_CLASSES} ${VARIANTS[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
