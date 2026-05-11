import { STORAGE_KEY } from "../constants/todo";
import { todoList } from "../data";
import { normalizeDisplayDate } from "./date";

export function getInitialTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? normalizeTodos(savedTodos) : todoList;
  } catch {
    return todoList;
  }
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function normalizeTodos(todos) {
  return todos.map((todo) => ({
    ...todo,
    dueDate: normalizeDisplayDate(todo.dueDate),
  }));
}
