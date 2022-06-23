import { useState } from "react";

type Todo = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed";

export const App = () => {
  /**
   * 追加するToDoの文字列ステート
   */
  const [text, setText] = useState("");
  /**
   * ToDoリストのステート
   */
  const [todos, setTodos] = useState<Todo[]>([]);
  /**
   * ToDoフィルターのステート
   */
  const [filter, setFilter] = useState<Filter>("all");

  const handleOnChangeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const handleOnChange = (value: string) => {
    setText(value);
  };

  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText("");
  };

  const handleOnEdit = (id: number, value: string) => {
    /**
     * todoリストをディープコピーする為に、todosからmapでtodoをコピーし、
     * todo内のプロパティをスプレッド構文でコピーする
     */
    const deevCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deevCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deevCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deevCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deevCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deevCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
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
    <div>
      <select
        defaultValue="all"
        onChange={(e) => handleOnChangeFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input
          type="text"
          disabled={filter === "checked" || filter === "removed"}
          value={text}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <input
          type="submit"
          value="追加"
          disabled={filter === "checked" || filter === "removed"}
        />
      </form>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => {
                  handleOnCheck(todo.id, todo.checked);
                }}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button
                onClick={() => {
                  handleOnRemove(todo.id, todo.removed);
                }}
              >
                {todo.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
