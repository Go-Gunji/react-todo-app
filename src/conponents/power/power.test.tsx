import { fireEvent, render, screen } from "@testing-library/react";
import Power from ".";
describe("Powerコンポーネントのテスト", () => {
  it("Powerコンポーネントの存在テスト", () => {
    render(<Power name="電源" />);
    const nameElement = screen.getByText(/電源 off/i);
    expect(nameElement).toBeInTheDocument();
  });
  it("offボタンがdisabledか", () => {
    render(<Power name="電源" />);
    const offButtonElement = screen.getByRole("button", { name: "OFF" });
    expect(offButtonElement).toBeDisabled();
  });
  it("onボタンがenableか", () => {
    render(<Power name="電源" />);
    const onButtonElement = screen.getByRole("button", { name: "ON" });
    expect(onButtonElement).not.toBeDisabled();
  });
  it("offからonへの変更", () => {
    render(<Power name="電源" />);
    const onButtonElement = screen.getByRole("button", { name: "ON" });
    fireEvent.click(onButtonElement);
    expect(onButtonElement).toBeDisabled();
  });
});
