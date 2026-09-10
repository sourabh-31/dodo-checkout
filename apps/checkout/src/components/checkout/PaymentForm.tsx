import { useCallback, useMemo, type FormEvent } from "react";
import type { CheckoutFormData, FormErrors } from "../../types";
import { useCheckout } from "../../context/CheckoutContext";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import {
  formatCard,
  formatCvc,
  formatExpiry,
  validateField,
} from "../../lib/utils";

export default function PaymentForm() {
  const {
    view,
    form,
    errors,
    declined,
    total,
    payLabel,
    isProcessing,
    setView,
    setForm,
    setErrors,
    setDeclined,
    setOrderId,
    switchView,
    scheduleProcessing,
  } = useCheckout();

  const disabled = isProcessing;

  const payError = useMemo(
    () =>
      ["holder", "card", "expiry", "cvc"]
        .map((k) => errors[k as keyof FormErrors])
        .filter(Boolean)[0] ?? "",
    [errors],
  );

  const handleBlur = useCallback(
    (field: string) => {
      const err = validateField(
        field,
        form[field as keyof CheckoutFormData] ?? "",
      );
      setErrors((prev) => {
        const next = { ...prev };
        if (err) next[field as keyof FormErrors] = err;
        else delete next[field as keyof FormErrors];
        return next;
      });
    },
    [form, setErrors],
  );

  const handleFieldChange = useCallback(
    (field: string, value: string) => {
      let v = value;
      if (field === "card") v = formatCard(value);
      if (field === "expiry") v = formatExpiry(value);
      if (field === "cvc") v = formatCvc(value);
      setForm((prev) => ({ ...prev, [field]: v }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    },
    [setForm, setErrors],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (view === "processing") return;

      const keys: (keyof CheckoutFormData)[] = [
        "email",
        "holder",
        "card",
        "expiry",
        "cvc",
      ];
      const newErrors: FormErrors = {};
      keys.forEach((k) => {
        const msg = validateField(k, form[k]);
        if (msg) newErrors[k] = msg;
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        if (newErrors.email) {
          document.getElementById("dodo-email")?.focus();
        }
        return;
      }

      const digits = form.card.replace(/\D/g, "");
      switchView("processing");
      setDeclined(null);

      scheduleProcessing(() => {
        if (digits === "4000000000009995") {
          setView("network");
          return;
        }
        if (digits === "4000000000000002") {
          setView("form");
          setDeclined({
            title: "Payment couldn't be completed",
            body: "Your card was declined. Check your details or try another card.",
          });
          return;
        }
        if (digits === "4000000000000341") {
          setView("form");
          setDeclined({
            title: "Payment couldn't be completed",
            body: "The bank couldn't authorise this attempt. Press Pay again to retry. Nothing has been charged.",
          });
          return;
        }
        const id =
          "#DODO-" + Math.random().toString(16).slice(2, 7).toUpperCase();
        setView("success");
        setOrderId(id);
      });
    },
    [
      view,
      form,
      setView,
      setErrors,
      setDeclined,
      setOrderId,
      switchView,
      scheduleProcessing,
    ],
  );

  const emailBorderColor = errors.email
    ? "var(--color-error-border)"
    : "var(--color-border-field)";

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 pt-2">
      {declined && (
        <div className="border border-error-border bg-error-bg rounded-[14px] p-[13px_15px] flex gap-3 items-start animate-dodo-shake">
          <div className="flex-none size-7 rounded-lg bg-error-icon-bg border border-error-icon-border grid place-items-center mt-px">
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1.6"
                y="4"
                width="12.8"
                height="8.6"
                rx="2"
                stroke="var(--color-error-icon)"
                strokeWidth="1.3"
              />
              <path
                d="M1.6 6.8 H14.4"
                stroke="var(--color-error-icon)"
                strokeWidth="1.3"
              />
              <path
                d="M4.4 13.8 L11.6 2.8"
                stroke="var(--color-error-icon)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[13.5px] font-semibold tracking-[-0.008em] text-error-title">
              {declined.title}
            </div>
            <div className="text-[13px] font-medium leading-[1.55] text-error-body">
              {declined.body}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <div className="text-[14.5px] font-semibold tracking-[-0.014em] text-text-section">
          Contact information
        </div>
        <div
          className="flex items-center gap-3 bg-surface-page border rounded-[14px] py-1 px-4 pl-3 transition-[border-color,box-shadow,background] duration-150"
          style={{ borderColor: emailBorderColor, boxShadow: "none" }}
        >
          <span className="flex-none size-7 rounded-[7px] bg-linear-to-br from-email-icon-from to-email-icon-to grid place-items-center">
            <svg
              width="13"
              height="10"
              viewBox="0 0 14 11"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="0.7"
                y="0.7"
                width="12.6"
                height="9.6"
                rx="2"
                stroke="white"
                strokeWidth="1.2"
              />
              <path
                d="M1.4 1.6 L7 6 L12.6 1.6"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <label
            htmlFor="dodo-email"
            className="flex-none text-[13.5px] font-medium tracking-[-0.006em] text-text-label"
          >
            Email
          </label>
          <Input
            id="dodo-email"
            variant="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={form.email}
            disabled={disabled}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            label="Email"
          />
        </div>
        {errors.email && (
          <div
            role="alert"
            className="text-[12.5px] font-medium tracking-[-0.004em] text-error-message animate-dodo-rising-200"
          >
            {errors.email}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[14.5px] font-semibold tracking-[-0.014em] text-text-section">
          Payment method
        </div>
        <div className="border border-border-input rounded-2xl p-4 flex flex-col gap-3">
          <div className="text-[12.5px] font-semibold tracking-[-0.004em] text-text-secondary">
            Card information
          </div>

          <div className="border border-border-card rounded-[11px] overflow-hidden bg-surface-card">
            <div className="flex items-center border-b border-divider">
              <Input
                id="card-holder"
                label="Cardholder name"
                autoComplete="cc-name"
                placeholder="Cardholder name"
                value={form.holder}
                disabled={disabled}
                onChange={(e) => handleFieldChange("holder", e.target.value)}
                onBlur={() => handleBlur("holder")}
              />
            </div>
            <div className="flex items-center gap-2 pr-3.5 border-b border-divider">
              <Input
                id="card-number"
                label="Card number"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 1234 1234 1234"
                value={form.card}
                disabled={disabled}
                onChange={(e) => handleFieldChange("card", e.target.value)}
                onBlur={() => handleBlur("card")}
              />
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                aria-hidden="true"
                className="flex-none opacity-45"
              >
                <rect
                  x="0.6"
                  y="0.6"
                  width="18.8"
                  height="12.8"
                  rx="2.4"
                  stroke="var(--color-icon-muted)"
                  strokeWidth="1.2"
                />
                <rect
                  x="0.6"
                  y="4"
                  width="18.8"
                  height="2.2"
                  fill="var(--color-icon-muted)"
                />
              </svg>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-divider">
                <Input
                  id="card-expiry"
                  label="Expiry"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM / YY"
                  value={form.expiry}
                  disabled={disabled}
                  onChange={(e) => handleFieldChange("expiry", e.target.value)}
                  onBlur={() => handleBlur("expiry")}
                />
              </div>
              <div>
                <Input
                  id="card-cvc"
                  label="CVC"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="CVC"
                  value={form.cvc}
                  disabled={disabled}
                  onChange={(e) => handleFieldChange("cvc", e.target.value)}
                  onBlur={() => handleBlur("cvc")}
                />
              </div>
            </div>
          </div>

          {payError && (
            <div
              role="alert"
              className="text-[12.5px] font-medium tracking-[-0.004em] text-error-message animate-dodo-rising-200"
            >
              {payError}
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={disabled}
        className="relative overflow-hidden w-full rounded-[14px] p-4.5 text-[15.5px] font-semibold tracking-[-0.014em]"
      >
        {isProcessing && (
          <Spinner
            size={15}
            className="border-[1.8px] border-primary-text/30 border-t-primary-text animate-dodo-spin-fast"
          />
        )}
        <span>{payLabel}</span>
        {isProcessing && (
          <span className="absolute left-0 bottom-0 h-0.5 w-[28%] bg-primary-text/60 animate-dodo-bar" />
        )}
      </Button>

      {isProcessing && (
        <div className="text-center text-[12.5px] font-medium text-text-muted -mt-2 animate-dodo-rising-250">
          Please don't close this window.
        </div>
      )}

      <div className="text-center text-xs font-medium leading-[1.6] tracking-[-0.002em] text-text-dim max-w-[46ch] mx-auto mt-auto">
        By subscribing, you authorize Dodo to charge you {total} according to
        the terms until you cancel.
      </div>
    </form>
  );
}
