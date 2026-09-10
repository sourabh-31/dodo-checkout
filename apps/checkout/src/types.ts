export type CheckoutView =
  | "form"
  | "loading"
  | "processing"
  | "success"
  | "declined"
  | "network"
  | "unavailable";

export type FormErrors = Partial<
  Record<"email" | "holder" | "card" | "expiry" | "cvc", string>
>;

export interface CheckoutFormData {
  email: string;
  holder: string;
  card: string;
  expiry: string;
  cvc: string;
}

export interface DeclinedInfo {
  title: string;
  body: string;
}
