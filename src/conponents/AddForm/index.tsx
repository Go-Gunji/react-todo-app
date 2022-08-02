import { AddFormProps } from "./type";

export const AddForm = (props: AddFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleOnSubmit();
      }}
    >
      <input
        className="shadow appearance-none border rounded mx-3"
        type="text"
        value={props.text}
        onChange={(e) => props.handleOnChange(e.target.value)}
      />
      <input
        className="bg-blue-500 text-white py-2 px-3 rounded mx-2"
        type="submit"
        value="追加"
      />
    </form>
  );
};
