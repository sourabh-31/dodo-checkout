import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  CheckoutView,
  CheckoutFormData,
  DeclinedInfo,
  FormErrors,
} from "../types";

interface CheckoutContextValue {
  productName: string;
  subtotal: string;
  total: string;
  payLabel: string;
  view: CheckoutView;
  isForm: boolean;
  isProcessing: boolean;
  showClose: boolean;
  closeDisabled: boolean;
  form: CheckoutFormData;
  errors: FormErrors;
  declined: DeclinedInfo | null;
  orderId: string | null;
  setView: Dispatch<SetStateAction<CheckoutView>>;
  setForm: Dispatch<SetStateAction<CheckoutFormData>>;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
  setDeclined: Dispatch<SetStateAction<DeclinedInfo | null>>;
  setOrderId: Dispatch<SetStateAction<string | null>>;
  switchView: (next: CheckoutView) => void;
  handleClose: () => void;
  scheduleProcessing: (finish: () => void) => void;
}

export const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx)
    throw new Error("useCheckout must be used within a CheckoutProvider");
  return ctx;
}
