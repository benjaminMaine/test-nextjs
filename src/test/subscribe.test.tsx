import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SubscribeForm } from "@/components/SubscribeForm";

vi.mock("@/app/actions", () => ({
  subscribeAction: vi.fn().mockResolvedValue({
    status: "success",
    message: "Inscription confirmée, merci !",
  }),
}));

describe("SubscribeForm", () => {
  it("renders email input and submit button", () => {
    render(<SubscribeForm />);
    expect(screen.getByPlaceholderText("votre@email.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeInTheDocument();
  });

  it("shows success message after submission", async () => {
    const user = userEvent.setup();
    render(<SubscribeForm />);
    await user.type(screen.getByPlaceholderText("votre@email.com"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /s'inscrire/i }));
    expect(await screen.findByRole("status")).toHaveTextContent("Inscription confirmée, merci !");
  });
});
