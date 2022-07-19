import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("リストのフィルター表示", () => {
  render(<App />);
  const selectElement = screen.getByText(/すべてのタスク/i);
  expect(selectElement).toBeInTheDocument();
});
