import { useState } from "react";

type Todo = {
  value: string;
  id: number;
};

export const App = () => {
  /**
   * 追加するToDoの文字列ステート
   */
  const [text, setText] = useState("");
  /**
   * ToDoリストのステート
   */
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input type="submit" value="追加" />
      </form>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}> {todo.value}</li>;
        })}
      </ul>
    </div>
  );
};
