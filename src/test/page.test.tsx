import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /get started/i })
    ).toBeInTheDocument();
  });
});
