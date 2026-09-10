import { useCheckout } from "../../context/CheckoutContext";

export default function Sidebar() {
  const { productName, subtotal, total } = useCheckout();

  return (
    <div className="bg-panel-bg text-panel-text p-[30px_34px_36px] flex flex-col min-h-0 overflow-y-auto">
      <div className="flex items-start gap-3.5 py-1 pb-5 border-b border-panel-border">
        <div className="flex-1 min-w-0 text-[17px] font-semibold tracking-[-0.018em] leading-[1.3]">
          {productName}
        </div>
        <div className="flex-none text-[17px] font-semibold tracking-[-0.018em] tabular-nums">
          {subtotal}
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13.5px] font-medium text-sidebar-label">
            Subtotal
          </span>
          <span className="text-[13.5px] font-semibold tabular-nums text-panel-text">
            {subtotal}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13.5px] font-medium text-sidebar-label">
            Tax
          </span>
          <span className="text-[13.5px] font-semibold text-sidebar-value tabular-nums">
            0.00
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 mt-3.5">
          <span className="text-[15px] font-semibold tracking-[-0.012em] text-panel-text">
            Total
          </span>
          <span className="text-[21px] font-semibold tracking-[-0.024em] tabular-nums text-sidebar-total">
            {total}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-7 flex items-center gap-2 text-sidebar-secure">
        <svg
          width="12"
          height="14"
          viewBox="0 0 13 15"
          fill="none"
          aria-hidden="true"
          className="flex-none"
        >
          <rect
            x="1"
            y="6"
            width="11"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M3.6 6V4.2a2.9 2.9 0 0 1 5.8 0V6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xs font-medium tracking-[-0.002em] leading-normal">
          Secure payment. Card details never leave this window.
        </span>
      </div>
    </div>
  );
}