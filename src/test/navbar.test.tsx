import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar } from "@/components/Navbar";

describe("Navbar", () => {
  it("displays the logo", () => {
    render(<Navbar />);
    expect(screen.getByText("NextJS Bootstrap")).toBeInTheDocument();
  });
});
