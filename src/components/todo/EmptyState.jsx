export function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
      <h3 className="text-lg font-bold">Không có công việc</h3>
      <p className="mt-2 text-sm text-slate-500">
        Thử đổi bộ lọc hoặc thêm một công việc mới.
      </p>
    </div>
  );
}
