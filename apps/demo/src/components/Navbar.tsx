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
    <nav className="flex items-center gap-3 rounded-3xl bg-white px-6 py-5 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-demo-ink">
        <div className="h-3.5 w-3.5 rotate-45 rounded-sm bg-white" />
      </div>
      <span className="text-2xl font-semibold tracking-tight">
        Demo<span className="font-medium text-gray-400">Store</span>
      </span>

      <div className="flex-1" />

      <div ref={containerRef} className="relative">
        <button
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-demo-chip px-3.5 py-2.5 text-sm font-semibold hover:bg-demo-border"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-demo-accent" />
          Callback log
          {logs.length > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-demo-ink px-1 text-xs font-semibold tabular-nums text-white">
              {logs.length}
            </span>
          )}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-3.5 w-3.5 shrink-0 stroke-gray-500 transition-transform ${
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
