import Button from "../ui/Button";
import { useCheckout } from "../../context/CheckoutContext";

export default function SuccessState() {
  const { productName, form, orderId, total, handleClose } = useCheckout();

  return (
    <div className="flex flex-1 min-h-0 flex-col justify-center pt-2 animate-dodo-fade">
      <div className="size-11 rounded-[15px] bg-primary flex items-center justify-center shadow-[0_12px_26px_-14px_var(--color-primary-shadow)] animate-dodo-pop">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6.4 12.6 L10.2 16.4 L17.6 8.2"
            stroke="var(--color-success-icon)"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="24"
            strokeDashoffset="24"
            className="animate-dodo-draw"
          />
        </svg>
      </div>

      <div className="text-[23px] font-semibold tracking-[-0.026em] leading-[1.2] mt-5 animate-dodo-rise-delayed-1">
        Payment successful
      </div>

      <div className="text-[14.5px] font-medium leading-[1.6] text-available-desc max-w-[38ch] mt-2.5 animate-dodo-rise-delayed-2">
        Your {productName} purchase is confirmed. A receipt is on its way to{" "}
        {form.email || "your inbox"}.
      </div>

      <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-available-divider animate-dodo-rise-delayed-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-available-ref-label">
            Order
          </span>
          <span className="text-[13px] font-semibold tracking-[-0.006em] text-available-ref-value">
            {orderId ?? ""}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-available-ref-label">
            Paid
          </span>
          <span className="text-[13px] font-semibold text-available-ref-value tabular-nums">
            {total}
          </span>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleClose}
        className="mt-6 w-full rounded-[14px] py-4 px-4 text-[15px] font-semibold tracking-[-0.012em] animate-dodo-rise-delayed-4"
      >
        Done
      </Button>
    </div>
  );
}
