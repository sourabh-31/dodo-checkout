import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";
import { CheckoutProvider } from "./context/CheckoutProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CheckoutProvider>
      <App />
    </CheckoutProvider>
  </StrictMode>,
);
