import { EmptyState } from "./EmptyState";
import { TodoItem } from "./TodoItem";
import { TodoToolbar } from "./TodoToolbar";

export function TodoBoard({
  searchText,
  statusFilter,
  todos,
  today,
  onDelete,
  onEdit,
  onSearchChange,
  onStatusFilterChange,
  onToggle,
}) {
  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <TodoToolbar
        searchText={searchText}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      <div className="space-y-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              today={today}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggle={onToggle}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
