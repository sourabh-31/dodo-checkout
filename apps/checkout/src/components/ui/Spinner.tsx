import type { HTMLAttributes } from "react";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
}

export default function Spinner({
  size = 15,
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full ${className ?? ""}`}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}