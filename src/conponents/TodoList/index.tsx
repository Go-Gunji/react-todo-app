import { TodoListProps } from "./type";

export const TodoList = (props: TodoListProps) => {
  const filteredTodos = props.todos.filter((todo) => {
    switch (props.filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <ul>
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              className="mx-3"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => {
                props.handleOnCheck(todo.id, todo.checked);
              }}
            />
            <input
              type="text"
              className="shadow appearance-none border rounded mx-1"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => props.handleOnEdit(todo.id, e.target.value)}
            />
            <button
              className="bg-red-500 text-white py-2 px-3 rounded m-2"
              onClick={() => {
                props.handleOnRemove(todo.id, todo.removed);
              }}
            >
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
