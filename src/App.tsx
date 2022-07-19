import { useState } from "react";
import { Select } from "./conponents/select";
import { Todo, Filter } from "./type";

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
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
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
      <Select handleOnChangeFilter={handleOnChangeFilter}></Select>
      {filter === "removed" ? (
        <button
          className="bg-gray-500 text-white py-2 px-3 rounded m-2"
          onClick={() => handleOnEmpty()}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        filter !== "checked" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <input
              className="shadow appearance-none border rounded mx-3"
              type="text"
              value={text}
              onChange={(e) => handleOnChange(e.target.value)}
            />
            <input
              className="bg-blue-500 text-white py-2 px-3 rounded mx-2"
              type="submit"
              value="追加"
            />
          </form>
        )
      )}
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
                  handleOnCheck(todo.id, todo.checked);
                }}
              />
              <input
                type="text"
                className="shadow appearance-none border rounded mx-1"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button
                className="bg-red-500 text-white py-2 px-3 rounded m-2"
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
