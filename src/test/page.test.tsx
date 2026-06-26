import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

vi.mock("@/lib/subscribers", () => ({
  getSubscriberCount: vi.fn().mockResolvedValue(0),
  createSubscriber: vi.fn().mockResolvedValue({ success: true, alreadyExists: false }),
}));

vi.mock("@/components/SubscriberCount", () => ({
  SubscriberCount: () => <p>0 inscrits</p>,
}));

describe("Home", () => {
  it("renders the landing page", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /bienvenue sur mon bootstrap nextjs/i })
    ).toBeInTheDocument();
  });
});
