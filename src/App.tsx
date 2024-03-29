import { useState } from "react";
import Power from "./conponents/power";
import { Select } from "./conponents/Select";
import { AddForm } from "./conponents/AddForm";
import { TodoList } from "./conponents/TodoList";
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
          <AddForm
            text={text}
            handleOnSubmit={handleOnSubmit}
            handleOnChange={handleOnChange}
          />
        )
      )}
      <TodoList
        todos={todos}
        filter={filter}
        handleOnCheck={handleOnCheck}
        handleOnEdit={handleOnEdit}
        handleOnRemove={handleOnRemove}
      />
      <Power name="電源"></Power>
    </div>
  );
};
