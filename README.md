# Todo List React

Ứng dụng quản lý công việc được xây dựng bằng React, Vite và Tailwind CSS. Ứng dụng cho phép người dùng thêm, chỉnh sửa, hoàn thành, xóa, tìm kiếm và lọc công việc, đồng thời lưu dữ liệu trong `localStorage` của trình duyệt.

## Tính năng

- Thêm công việc mới với tên, mô tả, mức ưu tiên, nhóm và ngày hết hạn.
- Chỉnh sửa công việc có sẵn trong danh sách.
- Đánh dấu công việc là đã hoàn thành hoặc đang làm.
- Xóa công việc.
- Tìm kiếm theo tên, nhóm hoặc mô tả.
- Lọc theo tất cả, đang làm hoặc đã hoàn thành.
- Hiển thị số lượng công việc tổng, đang làm và đã hoàn thành.
- Làm nổi bật các công việc đang làm nhưng đã quá hạn.
- Lưu công việc vào `localStorage` với key `react-todo-list`.
- Kiểm tra dữ liệu nhập gồm các trường bắt buộc, độ dài tối thiểu của tên, độ dài mô tả, mức ưu tiên hợp lệ và ngày hết hạn.

## Công nghệ sử dụng

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint

## Bắt đầu

### Yêu cầu

Cài đặt Node.js và npm. Dự án này có `package-lock.json`, vì vậy nên dùng `npm install` để cài đặt dependencies.

### Cài đặt

```bash
npm install
```

### Chạy môi trường phát triển

```bash
npm run dev
```

Vite sẽ hiển thị URL phát triển cục bộ trong terminal, thường là `http://localhost:5173`.

### Build cho production

```bash
npm run build
```

### Xem trước bản build production

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Cấu trúc dự án

```text
todo-list-react/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── todo/
│   ├── constants/
│   ├── utils/
│   ├── App.jsx
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Các file quan trọng

- `src/App.jsx` quản lý state của ứng dụng, xử lý submit form, lọc, chỉnh sửa, xóa, đánh dấu hoàn thành và đồng bộ với localStorage.
- `src/components/todo/TodoForm.jsx` hiển thị form thêm/chỉnh sửa công việc.
- `src/components/todo/TodoBoard.jsx` hiển thị thanh công cụ và danh sách công việc.
- `src/components/todo/TodoItem.jsx` hiển thị từng công việc và các hành động tương ứng.
- `src/utils/todoHelpers.js` chứa logic kiểm tra dữ liệu, tạo mới, cập nhật, lọc, sắp xếp, thống kê và kiểm tra quá hạn.
- `src/utils/todoStorage.js` tải và lưu công việc từ `localStorage`.
- `src/data.js` cung cấp dữ liệu mặc định khi chưa có dữ liệu đã lưu.

## Lưu trữ dữ liệu

Các công việc được tự động lưu vào `localStorage` của trình duyệt. Để reset ứng dụng về dữ liệu mặc định, hãy xóa key `react-todo-list` trong localStorage bằng browser devtools rồi tải lại trang.
