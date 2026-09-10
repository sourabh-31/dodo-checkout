import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "pill";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2.5 cursor-pointer transition-[background-color,border-color,color,box-shadow,transform] duration-150 disabled:cursor-not-allowed";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-text shadow-[0_10px_26px_-12px_var(--color-primary-shadow)] hover:bg-primary-hover active:scale-[0.994] focus:outline-none focus:shadow-[0_0_0_3px_var(--color-primary-focus)] disabled:bg-primary-disabled",
  outline:
    "border border-outline-border bg-surface-card text-text-primary hover:bg-outline-hover-bg hover:border-outline-hover-border focus:outline-none focus:shadow-[0_0_0_3px_var(--color-primary-focus)]",
  ghost:
    "border border-transparent bg-transparent text-text-dim hover:bg-surface-page focus:outline-none focus:shadow-[0_0_0_3px_var(--color-primary-focus)] disabled:opacity-55",
  pill: "border rounded-full py-[6px] px-3 font-medium tracking-[-0.004em]",
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${BASE_CLASSES} ${VARIANTS[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}