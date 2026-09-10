import { useCheckout } from "./context/CheckoutContext";
import Sidebar from "./components/layout/Sidebar";
import LoadingState from "./components/checkout/LoadingState";
import UnavailableState from "./components/checkout/UnavailableState";
import NetworkErrorState from "./components/checkout/NetworkErrorState";
import SuccessState from "./components/checkout/SuccessState";
import PaymentForm from "./components/checkout/PaymentForm";
import Header from "./components/layout/Header";

export default function App() {
  const { view, isForm } = useCheckout();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dodo secure checkout"
      className="w-full max-w-240 rounded-[26px] overflow-hidden bg-surface-card grid min-h-0 sm:grid-cols-[0.92fr_1.08fr] sm:h-174 sm:min-h-174 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
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
