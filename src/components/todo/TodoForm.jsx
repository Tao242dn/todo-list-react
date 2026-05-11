import { PRIORITY_OPTIONS } from "../../constants/todo";
import { ErrorText } from "../common/ErrorText";
import { TextField } from "../common/TextField";

export function TodoForm({
  errors,
  form,
  isEditing,
  today,
  onCancel,
  onChange,
  onSubmit,
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">
          {isEditing ? "Chỉnh sửa công việc" : "Thêm công việc"}
        </h2>
        {isEditing && (
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            type="button"
            onClick={onCancel}
          >
            Hủy
          </button>
        )}
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          error={errors.title}
          label="Tên công việc"
          name="title"
          placeholder="Ví dụ: Ôn useState"
          value={form.title}
          onChange={onChange}
        />

        <label className="block">
          <span className="flex items-center justify-between gap-3 text-sm font-semibold">
            Mô tả
            <span className="text-xs font-medium text-slate-400">
              {form.description.length}/200
            </span>
          </span>
          <textarea
            className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            name="description"
            placeholder="Mô tả chi tiết công việc"
            value={form.description}
            onChange={onChange}
          />
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Ưu tiên</span>
            <select
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              name="priority"
              value={form.priority}
              onChange={onChange}
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            {errors.priority && <ErrorText>{errors.priority}</ErrorText>}
          </label>

          <TextField
            error={errors.category}
            label="Nhóm"
            name="category"
            placeholder="study, practice..."
            value={form.category}
            onChange={onChange}
          />
        </div>

        <TextField
          error={errors.dueDate}
          label="Ngày hết hạn"
          min={today}
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={onChange}
        />

        <button
          className="w-full rounded-md bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-200"
          type="submit"
        >
          {isEditing ? "Lưu thay đổi" : "Thêm công việc"}
        </button>
      </form>
    </section>
  );
}
