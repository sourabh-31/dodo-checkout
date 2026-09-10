"use client";

import { useEffect, useRef, useState } from "react";
import { CallbackLog, type LogEntry } from "@/components/CallbackLog";

type NavbarProps = {
  logs: LogEntry[];
  onClear: () => void;
};

export function Navbar({ logs, onClear }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <nav className="flex items-center gap-2 rounded-2xl bg-white px-3 py-3 shadow-sm sm:gap-3 sm:rounded-3xl sm:px-6 sm:py-5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-demo-ink sm:h-9 sm:w-9 sm:rounded-xl">
        <div className="h-2.5 w-2.5 rotate-45 rounded-sm bg-white sm:h-3.5 sm:w-3.5" />
      </div>
      <span className="truncate text-base font-semibold tracking-tight sm:text-2xl">
        Demo<span className="font-medium text-gray-400">Store</span>
      </span>

      <div className="flex-1" />

      <div ref={containerRef} className="relative shrink-0">
        <button
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg bg-demo-chip px-2.5 py-2 text-xs font-semibold hover:bg-demo-border sm:gap-2 sm:rounded-xl sm:px-3.5 sm:py-2.5 sm:text-sm"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-demo-accent sm:h-2 sm:w-2" />
          <span className="hidden sm:inline">Callback log</span>
          <span className="sm:hidden">Log</span>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-3 w-3 shrink-0 stroke-gray-500 transition-transform sm:h-3.5 sm:w-3.5 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full right-0 z-20 mt-2">
            <CallbackLog logs={logs} onClear={onClear} />
          </div>
        )}
      </div>
    </nav>
  );
}
