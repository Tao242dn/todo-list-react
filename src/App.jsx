import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/layout/Header";
import { TodoBoard } from "./components/todo/TodoBoard";
import { TodoForm } from "./components/todo/TodoForm";
import { EMPTY_FORM } from "./constants/todo";
import { getToday } from "./utils/date";
import {
  createTodo,
  getTodoFormValues,
  getTodoStats,
  getVisibleTodos,
  updateTodo,
  validateTodo,
} from "./utils/todoHelpers";
import { getInitialTodos, saveTodos } from "./utils/todoStorage";

function App() {
  const [todos, setTodos] = useState(getInitialTodos);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const today = getToday();
  const isEditing = editingId !== null;

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const stats = useMemo(() => getTodoStats(todos), [todos]);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, statusFilter, searchText),
    [todos, statusFilter, searchText],
  );

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateTodo(form, today);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setTodos((currentTodos) => {
      if (!isEditing) {
        return [createTodo(form), ...currentTodos];
      }

      return currentTodos.map((todo) =>
        todo.id === editingId ? updateTodo(todo, form) : todo,
      );
    });

    resetForm();
  }

  function handleToggle(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }

  function handleDelete(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  function handleEdit(todo) {
    setEditingId(todo.id);
    setForm(getTodoFormValues(todo));
    setErrors({});
  }

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header stats={stats} />

        <div className="grid gap-6 lg:grid-cols-[390px_1fr]">
          <TodoForm
            errors={errors}
            form={form}
            isEditing={isEditing}
            today={today}
            onCancel={resetForm}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />

          <TodoBoard
            searchText={searchText}
            statusFilter={statusFilter}
            todos={visibleTodos}
            today={today}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSearchChange={setSearchText}
            onStatusFilterChange={setStatusFilter}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
