import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Page", () => {
  it("renders the description text", () => {
    render(<Home />);

    const text = screen.getByText(
      "Use the search box below to find cities around the world, and display the current weather."
    );

    expect(text).toBeInTheDocument();
  });
});
