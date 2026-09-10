import Button from "../ui/Button";
import { useCheckout } from "../../context/CheckoutContext";

export default function UnavailableState() {
  const { handleClose } = useCheckout();

  return (
    <div className="flex flex-1 min-h-0 flex-col justify-center gap-0 pt-2 animate-dodo-rise">
      <div className="size-11 rounded-[14px] bg-badge-bg flex items-center justify-center shadow-[0_10px_24px_-14px_var(--color-badge-shadow)]">
        <svg
          width="21"
          height="21"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 7.6 L11 4 L18 7.6 L18 15.2 L11 18.8 L4 15.2 Z"
            stroke="var(--color-badge-icon)"
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M4 7.6 L11 11.3 L18 7.6 M11 11.3 L11 18.8"
            stroke="var(--color-badge-icon)"
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity="0.35"
          />
          <path
            d="M7 15 L15 7"
            stroke="var(--color-badge-error-line)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="text-[23px] font-semibold tracking-[-0.026em] leading-[1.2] mt-5">
        Product unavailable
      </div>

      <div className="text-[14.5px] font-medium leading-[1.6] text-available-desc max-w-[38ch] mt-2.5">
        This product isn't available at the moment. Nothing has been charged to
        your card.
      </div>

      <div className="mt-6 pt-4 border-t border-available-divider flex items-center justify-between gap-3">
        <span className="text-[13px] font-medium text-available-ref-label">
          Reference
        </span>
        <span className="text-[13px] font-semibold tracking-[-0.006em] text-available-ref-value">
          product_not_found
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        className="mt-6 w-full rounded-[14px] py-4 px-4 text-[14.5px] font-semibold tracking-[-0.01em]"
      >
        Close checkout
      </Button>
    </div>
  );
}
