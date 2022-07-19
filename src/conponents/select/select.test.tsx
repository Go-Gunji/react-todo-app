import { render, screen } from "@testing-library/react";
import { Select } from ".";

test("リストのフィルター表示", () => {
  render(<Select handleOnChangeFilter={() => {}} />);
  const selectElement = screen.getByText(/すべてのタスク/i);
  expect(selectElement).toBeInTheDocument();
});
