import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Page", () => {
  it("renders an input", () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(
      "Enter a city name to see results..."
    );

    expect(input).toBeInTheDocument();
  });
});
