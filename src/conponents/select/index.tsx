import { SelectProps } from "./type";
import { Filter } from "../../type";

export const Select = (props: SelectProps) => {
  return (
    <select
      className="p-1 rounded border m-3"
      defaultValue="all"
      onChange={(e) => props.handleOnChangeFilter(e.target.value as Filter)}
    >
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ゴミ箱</option>
    </select>
  );
};
