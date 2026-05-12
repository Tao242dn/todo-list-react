## 1\. Tại sao không sửa trực tiếp Props và State?

### Props không nên sửa trực tiếp

**Props là dữ liệu được truyền từ component cha xuống component con.**

Component con chỉ nên **đọc props**, không nên sửa props trực tiếp.

Ví dụ sai:
```js
function UserCard({ user }) {  
    user.name = "New Name";  
}
```

Lý do:

- Props thuộc quyền kiểm soát của component cha. Component con sửa trực tiếp props sẽ phá vỡ luồng dữ liệu một chiều của React.
- Trong React, dữ liệu thường đi theo hướng: Parent Component -> Child Component
- Nếu component con muốn thay đổi dữ liệu, nó nên gọi một function được truyền từ cha xuống.

Ví dụ đúng:
```js
function UserCard({ user, onChangeName }) {  
 return (  
    <button onClick={() => onChangeName("New Name")}>  
        Change Name  
    </button>  
 );  
}
```

### State không nên sửa trực tiếp

**State là dữ liệu nội bộ của component.**

Không nên làm:
```txt
count = count + 1;
```

Hoặc với object/array:
```txt
user.name = "New Name";  
todos.push(newTodo);
```

Lý do: React không biết state đã thay đổi nếu mình sửa trực tiếp.React cần setState/useState setter để biết rằng component cần re-render.

Ví dụ sai:
```js
const [count, setCount] = useState(0);  
count = count + 1; // Sai
```

Ví dụ đúng:
```js
setCount(count + 1);
```

Với object:
```js
setUser({ ...user, name: "New Name"});
```

Với array:
```js
setTodos([...todos, newTodo]);
```
### Kết luận

Không sửa trực tiếp props/state vì React dựa vào immutability để phát hiện thay đổi và re-render UI đúng cách.

## 2\. Tầm quan trọng của key khi render list là gì?

Khi render list trong React, ta thường viết:
```js
 const users = users.map(user => (  
        <UserCard key={user.id} user={user}/>
 ));
```

**key** giúp React nhận diện **item nào thay đổi, item nào thêm, item nào bị xóa**.

React dùng key trong quá trình **reconciliation**, tức là quá trình so sánh virtual DOM cũ và mới để cập nhật UI hiệu quả.

### Nếu không có key hoặc dùng key sai thì sao?

Ví dụ dùng index làm key:
```js
users.map((user, index) => (  
 <UserCard key={index} user={user}/>  
));
```

Cách này có thể gây lỗi nếu list có thao tác:

- Thêm item
- Xóa item
- Sắp xếp lại item
- Filter item
- Drag/drop item

Ví dụ:
```txt
List ban đầu:  
0 - A  
1 - B  
2 - C  
Xóa A:  
0 - B  
1 - C
```

Nếu dùng index làm key, React có thể hiểu nhầm rằng item ở vị trí 0 vẫn là item cũ, trong khi thực tế từ A đã thành B.

Điều này có thể gây lỗi UI như:

- Input hiển thị sai value
- Component giữ nhầm internal state
- Animation sai
- Checkbox bị checked nhầm

### Nên dùng gì làm key?

Nên dùng ID ổn định từ dữ liệu:
```js
users.map(user => (  
 <UserCard key={user.id} user={user} />  
));
```

Không nên dùng:
```js
key={Math.random()}
```
Vì mỗi lần render key sẽ đổi, React sẽ tưởng toàn bộ list là item mới.

### Kết luận

key giúp React xác định chính xác từng item trong list, từ đó cập nhật UI đúng và tối ưu hiệu năng.

## 3\. Sự khác nhau giữa setState(newValue) và setState(prev => newValue)

Trong React function component, ta thường cập nhật state bằng setter từ useState.

Ví dụ:
```js
const [count, setCount] = useState(0);
```
Có 2 cách cập nhật phổ biến:
```js
setCount(count + 1);
```
và:
```js
setCount(prev => prev + 1);
```
### Cách 1: Truyền giá trị trực tiếp
```js
setCount(count + 1);
```
Cách này dùng giá trị count ở thời điểm component đang render.

Ví dụ:
```js
function handleClick() {  
    setCount(count + 1);  
}
```

Nếu count = 0, thì React hiểu là:
```js
setCount(1);
```
Cách này ổn khi state mới **không phụ thuộc nhiều vào state trước đó**, hoặc chỉ cập nhật một lần đơn giản.

Ví dụ:
```js
setName("John");  
setIsOpen(true);  
setSelectedId(id);
```
### Cách 2: Truyền callback function
```js
setCount(prev => prev + 1);
```

Ở đây, prev là giá trị state mới nhất mà React đang giữ tại thời điểm xử lý update.

Cách này nên dùng khi state mới **phụ thuộc vào state trước đó**.

Ví dụ:
```js
function handleClick() {  
    setCount(prev => prev + 1);  
}
```

### Khác biệt rõ nhất khi cập nhật nhiều lần liên tiếp

Ví dụ dùng giá trị trực tiếp:
```js
function handleClick() {  
    setCount(count + 1);  
    setCount(count + 1);  
    setCount(count + 1);  
}
```

Nếu count = 0, thì cả 3 dòng đều là:
```js
setCount(1);  
setCount(1);  
setCount(1);
```
Kết quả cuối cùng:
```js
count = 1
```
Không phải 3.

Ví dụ dùng callback:
```js
function handleClick() {  
    setCount(prev => prev + 1);  
    setCount(prev => prev + 1);  
    setCount(prev => prev + 1);  
}
```

React sẽ xử lý theo thứ tự:
```txt
prev = 0 -> 1  
prev = 1 -> 2  
prev = 2 -> 3
```
Kết quả cuối cùng:

count = 3

### Khi nào dùng cách nào?

Dùng giá trị trực tiếp khi update không phụ thuộc state cũ:
```js
setIsOpen(true);  
setName("Alice");  
setSelectedUser(user);
```
Dùng callback khi update phụ thuộc state cũ:
```js
setCount(prev => prev + 1);  
setTodos(prev => \[...prev, newTodo\]);  
setUser(prev => ({ ...prev, name: "Alice" }));
```
### Kết luận

- setState(newValue) dùng khi giá trị mới không cần dựa vào state cũ.
- setState(prev => newValue) dùng khi giá trị mới phụ thuộc vào state trước đó, đặc biệt khi có nhiều update liên tiếp hoặc update bất đồng bộ.

## 4\. Sự khác nhau giữa Function Component và Arrow Function Component

Cả hai đều là **function component** trong React.

Có 2 cách viết:

### Function Declaration Component
```js
function UserCard(props) {  
    return <div>{props.name}</div>  
}
```

### Arrow Function Component
```js
const UserCard = (props) => {  
    return <div>{props.name}</div> 
};
```

## Điểm giống nhau

Cả hai đều:

- Nhận props
- Return JSX
- Có thể dùng hooks
- Có thể quản lý state
- Có thể render UI

Ví dụ:
```js
function UserCard({ name }) {  
    return <div>{name}</div>  
}
```

và:
```js
const UserCard = ({ name }) => {  
    return <div>{name}</div>  
};
```
Trong React hiện đại, cả hai đều hợp lệ.

## Điểm khác nhau

### 1\. Hoisting

Function Declaration được hoist.

Có thể gọi trước khi khai báo:
```js
export default function App() {  
    return <UserCard name="John" />  
}

function UserCard({ name }) {  
    return <div>{name}</div>  
}
```
Arrow Function gán vào const thì không thể dùng trước khi khởi tạo.
```js
export default function App() {  
    return <UserCard name="John" /> // Lỗi nếu UserCard chưa được khởi tạo  
}

const UserCard = ({ name }) => {  
    return <div>{name}</div>  
};
```
### 2\. Cú pháp

Function Declaration:
```js
function UserCard() {  
    return <div>User Card</div>  
}
```

Arrow Function:
```js
const UserCard = () => {  
    return <div>User Card</div>  
};
```

Arrow Function cũng có thể viết ngắn hơn:
```js
const UserCard = () => <div>User Card</div>
```
### 3\. this

Trong function component hiện đại, thường không dùng this.

Nhưng về JavaScript:

- function declaration có this riêng tùy cách gọi.
- arrow function không có this riêng, nó lấy this từ lexical scope bên ngoài.

Tuy nhiên, với React function component dùng hooks, khác biệt này thường không ảnh hưởng nhiều.

### 4\. Cách export

Function Declaration có thể export trực tiếp:
```js
export default function UserCard() {  
    return <div>User Card</div> 
}
```

Arrow Function thường viết:
```js
const UserCard = () => {  
    return <div>User Card</div>  
};

export default UserCard;
```
Hoặc:
```js
export const UserCard = () => {  
    return <div>User Card</div>  
};
```
## Nên dùng loại nào?

Cả hai đều đúng. Nhưng trong thực tế:

### Function Declaration phù hợp khi

- Muốn code dễ đọc
- Muốn tận dụng hoisting
- Muốn export default trực tiếp
- Muốn stack trace dễ nhìn hơn trong một số trường hợp

### Arrow Function phù hợp khi

- Team convention đang dùng const
- Muốn viết component ngắn gọn
- Muốn đồng bộ style với callback, handler, helper function

### Kết luận

- Function Component và Arrow Function Component đều là function component trong React.
- Sự khác biệt chủ yếu đến từ cú pháp JavaScript, hoisting, this, và coding convention của team.

---

## Demo Video
[![Demo]](https://youtu.be/PATOnWZIV80)

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
