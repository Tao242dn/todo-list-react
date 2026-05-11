export function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function inputDateToDisplayDate(inputDate) {
  if (!isInputDate(inputDate)) return inputDate;

  const [year, month, day] = inputDate.split("-");
  return `${Number(day)}/${Number(month)}/${year}`;
}

export function displayDateToInputDate(displayDate) {
  if (isInputDate(displayDate)) return displayDate;
  if (!isDisplayDate(displayDate)) return "";

  const [day, month, year] = displayDate.split("/");
  return `${year}-${dayOrMonthToInputValue(month)}-${dayOrMonthToInputValue(
    day,
  )}`;
}

export function normalizeDisplayDate(dateValue) {
  if (isInputDate(dateValue)) return inputDateToDisplayDate(dateValue);
  if (!isDisplayDate(dateValue)) return dateValue;

  const [day, month, year] = dateValue.split("/");
  return `${Number(day)}/${Number(month)}/${year}`;
}

export function getDateTimestamp(dateValue) {
  const inputDate = displayDateToInputDate(dateValue);
  return inputDate ? new Date(`${inputDate}T00:00:00`).getTime() : 0;
}

export function formatCreatedDate(createdAt) {
  return new Date(createdAt).toLocaleDateString("vi-VN");
}

function isInputDate(dateValue) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateValue);
}

function isDisplayDate(dateValue) {
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateValue);
}

function dayOrMonthToInputValue(value) {
  return value.padStart(2, "0");
}
