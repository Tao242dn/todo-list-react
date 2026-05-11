import { StatCard } from "./StatCard";

export function Header({ stats }) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-6 px-5 py-6 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            React Exercise
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Todo List
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Quản lý công việc
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 self-center">
          <StatCard label="Tổng" value={stats.total} />
          <StatCard label="Đang làm" value={stats.active} />
          <StatCard label="Xong" value={stats.completed} />
        </div>
      </div>
    </section>
  );
}
