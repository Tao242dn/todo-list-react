import { FILTER_OPTIONS } from "../../constants/todo";

export function TodoToolbar({
  searchText,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}) {
  return (
    <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
      <label className="block">
        <span className="sr-only">Tìm kiếm</span>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          placeholder="Tìm theo tên, nhóm hoặc mô tả..."
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="grid grid-cols-3 rounded-md border border-slate-300 p-1 text-sm font-semibold">
        {FILTER_OPTIONS.map((filter) => (
          <button
            className={`rounded px-3 py-2 transition ${
              statusFilter === filter.value
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            key={filter.value}
            type="button"
            onClick={() => onStatusFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
