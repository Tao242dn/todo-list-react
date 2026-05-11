export function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase text-slate-500">
        {label}
      </p>
    </div>
  );
}
