import { Filter, Todo } from "../../type";

export type TodoListProps = {
  todos: Todo[];
  filter: Filter;
  handleOnCheck: (id: number, checked: boolean) => void;
  handleOnEdit: (id: number, value: string) => void;
  handleOnRemove: (id: number, removed: boolean) => void;
};
