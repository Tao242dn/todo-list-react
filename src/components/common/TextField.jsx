import { ErrorText } from "./ErrorText";

export function TextField({
  error,
  label,
  min,
  name,
  placeholder = "",
  type = "text",
  value,
  onChange,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        min={min}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}
