import { PRIORITY_LABELS, PRIORITY_STYLES } from "../../constants/todo";
import { formatCreatedDate } from "../../utils/date";
import { isTodoOverdue } from "../../utils/todoHelpers";
import { TodoBadge } from "./TodoBadge";

export function TodoItem({ today, todo, onDelete, onEdit, onToggle }) {
  const isOverdue = isTodoOverdue(todo, today);
  const priorityStyle = PRIORITY_STYLES[todo.priority] ?? PRIORITY_STYLES.medium;
  const priorityLabel = PRIORITY_LABELS[todo.priority] ?? todo.priority;

  return (
    <article
      className={`rounded-lg border p-4 transition ${
        todo.isCompleted
          ? "border-slate-200 bg-slate-50"
          : "border-slate-200 bg-white hover:border-teal-200 hover:shadow-sm"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <label className="flex min-w-0 items-start gap-3">
          <input
            checked={todo.isCompleted}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
            type="checkbox"
            onChange={() => onToggle(todo.id)}
          />
          <span className="min-w-0">
            <span
              className={`block text-lg font-bold ${
                todo.isCompleted
                  ? "text-slate-400 line-through"
                  : "text-slate-950"
              }`}
            >
              {todo.title}
            </span>
            {todo.description && (
              <span className="mt-1 block wrap-break-word text-sm leading-6 text-slate-600">
                {todo.description}
              </span>
            )}
          </span>
        </label>

        <div className="flex shrink-0 gap-2">
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            type="button"
            onClick={() => onEdit(todo)}
          >
            Sửa
          </button>
          <button
            className="rounded-md border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
            type="button"
            onClick={() => onDelete(todo.id)}
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <TodoBadge className={priorityStyle}>{priorityLabel}</TodoBadge>
        <TodoBadge>{todo.category}</TodoBadge>
        <TodoBadge>Tạo: {formatCreatedDate(todo.createdAt)}</TodoBadge>
        <TodoBadge
          className={
            isOverdue
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : undefined
          }
        >
          Hạn: {todo.dueDate}
        </TodoBadge>
      </div>
    </article>
  );
}
