import { PRIORITY_OPTIONS } from "../constants/todo";
import {
  displayDateToInputDate,
  getDateTimestamp,
  inputDateToDisplayDate,
} from "./date";

export function getTodoStats(todos) {
  const completed = todos.filter((todo) => todo.isCompleted).length;

  return {
    total: todos.length,
    completed,
    active: todos.length - completed,
  };
}

export function getVisibleTodos(todos, statusFilter, searchText) {
  const keyword = searchText.trim().toLowerCase();

  return todos
    .filter((todo) => todoMatchesStatus(todo, statusFilter))
    .filter((todo) => todoMatchesKeyword(todo, keyword))
    .sort((a, b) => getDateTimestamp(a.dueDate) - getDateTimestamp(b.dueDate));
}

export function validateTodo(form, today) {
  const errors = {};
  const trimmedTitle = form.title.trim();
  const trimmedCategory = form.category.trim();

  if (!trimmedTitle) {
    errors.title = "Tên công việc là bắt buộc.";
  } else if (trimmedTitle.length < 3) {
    errors.title = "Tên công việc phải có ít nhất 3 ký tự.";
  }

  if (form.description.length > 200) {
    errors.description = "Mô tả không được vượt quá 200 ký tự.";
  }

  if (!PRIORITY_OPTIONS.some((priority) => priority.value === form.priority)) {
    errors.priority = "Mức ưu tiên không hợp lệ.";
  }

  if (!trimmedCategory) {
    errors.category = "Nhóm công việc là bắt buộc.";
  }

  if (!form.dueDate) {
    errors.dueDate = "Ngày hết hạn là bắt buộc.";
  } else if (form.dueDate < today) {
    errors.dueDate = "Ngày hết hạn không được nhỏ hơn ngày hiện tại.";
  }

  return errors;
}

export function createTodo(form) {
  return {
    id: Date.now(),
    ...getSanitizedFormValues(form),
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
}

export function updateTodo(todo, form) {
  return {
    ...todo,
    ...getSanitizedFormValues(form),
  };
}

export function getTodoFormValues(todo) {
  return {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    category: todo.category,
    dueDate: displayDateToInputDate(todo.dueDate),
  };
}

export function isTodoOverdue(todo, today) {
  return !todo.isCompleted && displayDateToInputDate(todo.dueDate) < today;
}

function todoMatchesStatus(todo, statusFilter) {
  if (statusFilter === "active") return !todo.isCompleted;
  if (statusFilter === "completed") return todo.isCompleted;
  return true;
}

function todoMatchesKeyword(todo, keyword) {
  if (!keyword) return true;

  return [todo.title, todo.category, todo.description].some((field) =>
    String(field ?? "")
      .toLowerCase()
      .includes(keyword),
  );
}

function getSanitizedFormValues(form) {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority,
    category: form.category.trim(),
    dueDate: inputDateToDisplayDate(form.dueDate),
  };
}
