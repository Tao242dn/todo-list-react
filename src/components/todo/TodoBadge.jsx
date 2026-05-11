export function TodoBadge({ children, className = "" }) {
  const fallbackClass = "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`rounded-full border px-3 py-1 ${className || fallbackClass}`}
    >
      {children}
    </span>
  );
}
