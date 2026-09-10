import { useCheckout } from "./context/CheckoutContext";
import Sidebar from "./components/layout/Sidebar";
import LoadingState from "./components/checkout/LoadingState";
import UnavailableState from "./components/checkout/UnavailableState";
import NetworkErrorState from "./components/checkout/NetworkErrorState";
import SuccessState from "./components/checkout/SuccessState";
import PaymentForm from "./components/checkout/PaymentForm";
import Header from "./components/layout/Header";
import { useEffect } from "react";

export default function App() {
  const { view, isForm, instanceId, parentOrigin } = useCheckout();

  useEffect(() => {
    // Send ready log
    window.parent.postMessage(
      {
        source: "dodo-checkout",
        type: "READY",
        instanceId,
      },
      parentOrigin,
    );
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dodo secure checkout"
      className="w-full h-dvh overflow-y-auto overflow-x-hidden overscroll-contain rounded-none bg-surface-card grid min-h-0 fixed inset-0 animate-dodo-rise sm:max-w-240 sm:h-174 sm:min-h-174 sm:rounded-[26px] sm:overflow-hidden sm:grid-cols-[0.92fr_1.08fr] sm:absolute sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2"
    >
      <Sidebar />

      <div className="relative p-[26px_34px_32px] flex flex-col bg-surface-card min-h-0 overflow-y-auto overscroll-contain">
        <Header />

        {view === "loading" && <LoadingState />}

        {view === "unavailable" && <UnavailableState />}

        {view === "network" && <NetworkErrorState />}

        {view === "success" && <SuccessState />}

        {isForm && <PaymentForm />}
      </div>
    </div>
  );
}
