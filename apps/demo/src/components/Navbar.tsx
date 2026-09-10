"use client";

import { useEffect, useRef, useState } from "react";
import { CallbackLog, type LogEntry } from "@/components/CallbackLog";

type NavbarProps = {
  logs: LogEntry[];
  onClear: () => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export function Navbar({ logs, onClear, search, onSearchChange }: NavbarProps) {
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
    <nav className="flex flex-wrap items-center gap-2 rounded-2xl bg-white px-3 py-3 shadow-sm sm:gap-3 sm:rounded-3xl sm:px-6 sm:py-5">
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

      <div className="relative hidden max-w-xs shrink-0 sm:block">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 stroke-gray-400"
        >
          <circle cx="9" cy="9" r="6" strokeWidth="1.5" />
          <path d="M17 17l-3.5-3.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl bg-demo-chip py-2.5 pr-3 pl-9 text-sm font-medium outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-demo-accent-soft"
        />
      </div>

      <div className="relative order-last w-full sm:hidden">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 stroke-gray-400"
        >
          <circle cx="9" cy="9" r="6" strokeWidth="1.5" />
          <path d="M17 17l-3.5-3.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl bg-demo-chip py-2.5 pr-3 pl-9 text-sm font-medium outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-demo-accent-soft"
        />
      </div>
    </nav>
  );
}
