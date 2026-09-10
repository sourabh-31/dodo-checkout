import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  CheckoutView,
  CheckoutFormData,
  DeclinedInfo,
  FormErrors,
} from "../types";
import { CheckoutContext } from "./CheckoutContext";

const PROCESSING_MS = 1900;
const PRODUCT_NAME = "T-Shirt";
const PRODUCT_AMOUNT = 250;

interface CheckoutProviderProps {
  children: ReactNode;
}

function formatCurrency(n: number): string {
  return "\u20B9" + n.toLocaleString("en-IN");
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const params = new URLSearchParams(window.location.search);

  const instanceId = params.get("instanceId");
  const productId = params.get("productId");
  const parentOrigin = params.get("origin");

  const productName = PRODUCT_NAME;
  const amount = PRODUCT_AMOUNT;

  console.log(instanceId);

  const [view, setView] = useState<CheckoutView>("form");
  const [form, setForm] = useState<CheckoutFormData>({
    email: "",
    holder: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [declined, setDeclined] = useState<DeclinedInfo | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const processTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const clearTimers = useCallback(() => {
    if (processTimerRef.current) clearTimeout(processTimerRef.current);
    processTimerRef.current = null;
  }, []);

  const switchView = useCallback(
    (next: CheckoutView) => {
      clearTimers();
      setView(next);
      if (next === "form") setDeclined(null);
    },
    [clearTimers],
  );

  const handleClose = useCallback(() => {
    if (view === "processing") return;

    if (!parentOrigin || !instanceId) return;

    window.parent.postMessage(
      {
        source: "dodo-checkout",
        type: "CLOSED",
        instanceId,
        reason: "user",
      },
      parentOrigin,
    );
  }, [view, clearTimers]);

  const scheduleProcessing = useCallback(
    (finish: () => void) => {
      clearTimers();
      processTimerRef.current = setTimeout(finish, PROCESSING_MS);
    },
    [PROCESSING_MS, clearTimers],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view !== "processing") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, handleClose]);

  const subtotal = useMemo(() => formatCurrency(amount), [amount]);
  const total = useMemo(() => formatCurrency(amount), [amount]);
  const payLabel = useMemo(
    () =>
      view === "processing"
        ? "Processing payment\u2026"
        : "Pay " + formatCurrency(amount),
    [view, amount],
  );

  const isForm = view === "form" || view === "processing";
  const isProcessing = view === "processing";
  const showClose = view !== "success";
  const closeDisabled = isProcessing;

  const value = useMemo(
    () => ({
      productName,
      subtotal,
      total,
      payLabel,
      view,
      isForm,
      isProcessing,
      showClose,
      closeDisabled,
      form,
      errors,
      declined,
      orderId,
      setView,
      setForm,
      setErrors,
      setDeclined,
      setOrderId,
      switchView,
      handleClose,
      scheduleProcessing,
    }),
    [
      productName,
      subtotal,
      total,
      payLabel,
      view,
      isForm,
      isProcessing,
      showClose,
      closeDisabled,
      form,
      errors,
      declined,
      orderId,
      switchView,
      handleClose,
      scheduleProcessing,
    ],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
