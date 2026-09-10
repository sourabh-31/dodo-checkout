export type LogEntry = {
  id: number;
  time: string;
  fn: string;
  arg: string;
};

type CallbackLogProps = {
  logs: LogEntry[];
  onClear: () => void;
};

const EVENT_COLOR: Record<string, string> = {
  onSuccess: "text-emerald-600",
  onError: "text-red-600",
  onClose: "text-amber-600",
};

export function CallbackLog({ logs, onClear }: CallbackLogProps) {
  const hasLogs = logs.length > 0;

  return (
    <div className="w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-demo-border">
      <div className="flex items-center justify-between border-b border-demo-border px-4 py-3">
        <span className="text-sm font-semibold tracking-tight">
          Callback log
        </span>
        <button
          onClick={onClear}
          disabled={!hasLogs}
          className="cursor-pointer text-xs font-semibold text-demo-muted-icon hover:text-demo-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-demo-muted-icon"
        >
          Clear
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {hasLogs ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-1 border-b border-gray-100 px-4 py-3 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs font-semibold ${
                    EVENT_COLOR[log.fn] ?? "text-demo-accent-strong"
                  }`}
                >
                  {log.fn}
                </span>
                <span className="font-mono text-xs tabular-nums text-gray-400">
                  {log.time}
                </span>
              </div>
              <p className="truncate text-sm font-medium text-demo-ink">
                {log.arg}
              </p>
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center text-sm font-medium text-gray-400">
            No callbacks yet
          </div>
        )}
      </div>
    </div>
  );
}
