import Button from "../ui/Button";
import { useCheckout } from "../../context/CheckoutContext";

export default function NetworkErrorState() {
  const { total, handleClose } = useCheckout();

  return (
    <div className="flex flex-1 min-h-0 flex-col justify-center pt-2 animate-dodo-rise">
      <div className="size-12 rounded-[15px] bg-badge-bg flex items-center justify-center shadow-[0_10px_24px_-14px_var(--color-badge-shadow)]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.6 8.4 A12 12 0 0 1 19.4 8.4"
            stroke="var(--color-badge-icon)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.28"
          />
          <path
            d="M5.6 11.6 A8 8 0 0 1 11 9.4"
            stroke="var(--color-badge-icon)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M16.4 11.6 A8 8 0 0 0 14.2 10.1"
            stroke="var(--color-badge-icon)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M8.6 15 A4 4 0 0 1 11 13.9"
            stroke="var(--color-badge-icon)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="11" cy="17.6" r="1.15" fill="var(--color-badge-icon)" />
          <path
            d="M14.6 16.8 L19.4 12.4"
            stroke="var(--color-badge-network-line)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="text-[23px] font-semibold tracking-[-0.026em] leading-[1.2] mt-5">
        Connection lost
      </div>

      <div className="text-[14.5px] font-medium leading-[1.6] text-available-desc max-w-[38ch] mt-2.5">
        We couldn't reach the payment service. Your card was not charged and
        your details are still here.
      </div>

      <div className="mt-7 pt-5 border-t border-available-divider flex items-center justify-between gap-3">
        <span className="text-[13px] font-medium text-available-ref-label">
          Amount held
        </span>
        <span className="text-[13px] font-semibold text-available-ref-value tabular-nums">
          {total} · not charged
        </span>
      </div>

      <Button
        type="button"
        onClick={handleClose}
        className="mt-6 w-full rounded-[14px] py-4 px-4 text-[15px] font-semibold tracking-[-0.012em]"
      >
        Try again
      </Button>
    </div>
  );
}
