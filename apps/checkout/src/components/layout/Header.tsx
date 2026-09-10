import Button from "../ui/Button";
import { useCheckout } from "../../context/CheckoutContext";

export default function Header() {
  const { showClose, closeDisabled, handleClose } = useCheckout();

  return (
    <div className="flex items-center justify-between gap-3 pb-2.5">
      <div className="flex items-baseline gap-2">
        <div className="text-[15.5px] font-semibold tracking-[-0.02em] text-text-primary">
          Dodo
        </div>
        <div className="w-px h-3 bg-border-input" />
        <div className="text-[12.5px] font-medium tracking-[-0.006em] text-text-dimmer">
          Secure checkout
        </div>
      </div>

      {showClose && (
        <Button
          type="button"
          variant="ghost"
          aria-label="Close checkout"
          disabled={closeDisabled}
          onClick={handleClose}
          className="flex-none w-8 h-8 rounded-[9px]"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5 L12.5 12.5 M12.5 1.5 L1.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      )}
    </div>
  );
}