import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/Hero";

describe("Hero", () => {
  it("displays the main heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /bienvenue sur mon bootstrap nextjs/i })
    ).toBeInTheDocument();
  });

  it("displays the subtitle", () => {
    render(<Hero />);
    expect(
      screen.getByText(/next\.js.*vitest.*tailwind/i)
    ).toBeInTheDocument();
  });
});
