import Spinner from "../ui/Spinner";

export default function LoadingState() {
  return (
    <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-4 animate-dodo-fade">
      <Spinner
        size={26}
        className="border-2 border-spinner-track border-t-spinner-active animate-dodo-spin"
      />
      <div className="text-[13.5px] font-medium text-text-muted">
        Loading checkout…
      </div>
    </div>
  );
}
