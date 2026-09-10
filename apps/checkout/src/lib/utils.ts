export function formatCurrency(n: number): string {
  return "\u20B9" + n.toLocaleString("en-IN");
}

export function formatCard(v: string): string {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function formatExpiry(v: string): string {
  let d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length >= 1 && parseInt(d[0], 10) > 1) d = "0" + d;
  return d.length > 2 ? d.slice(0, 2) + " / " + d.slice(2) : d;
}

export function formatCvc(v: string): string {
  return v.replace(/\D/g, "").slice(0, 4);
}

export function validateField(key: string, val: string): string | null {
  const v = val.trim();
  switch (key) {
    case "email":
      if (!v) return "Enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v))
        return "Please enter a valid email address.";
      return null;
    case "holder":
      return !v ? "Enter the name on the card." : null;
    case "card": {
      const d = v.replace(/\D/g, "");
      if (!d) return "Enter your card number.";
      if (d.length < 16) return "Card number looks incomplete.";
      return null;
    }
    case "expiry": {
      const d = v.replace(/\D/g, "");
      if (!d) return "Enter the expiry date.";
      if (d.length < 4) return "Use MM / YY.";
      const m = parseInt(d.slice(0, 2), 10);
      const y = 2000 + parseInt(d.slice(2), 10);
      if (m < 1 || m > 12) return "Invalid month.";
      const now = new Date();
      if (
        y < now.getFullYear() ||
        (y === now.getFullYear() && m < now.getMonth() + 1)
      )
        return "Card has expired.";
      return null;
    }
    case "cvc": {
      if (!v) return "Enter the CVC.";
      if (v.length < 3) return "CVC needs 3 digits.";
      return null;
    }
    default:
      return null;
  }
}
