export const STORAGE_KEY = "react-todo-list";

export const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "medium",
  category: "",
  dueDate: "",
};

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Thấp" },
  { value: "medium", label: "Vừa" },
  { value: "high", label: "Cao" },
];

export const FILTER_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Đang làm" },
  { value: "completed", label: "Xong" },
];

export const PRIORITY_LABELS = {
  low: "Thấp",
  medium: "Vừa",
  high: "Cao",
};

export const PRIORITY_STYLES = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  high: "border-rose-200 bg-rose-50 text-rose-700",
};
