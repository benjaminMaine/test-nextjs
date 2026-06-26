import { describe, expect, it, beforeEach } from "vitest";

describe("subscribers store", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("adds a subscriber and returns success", async () => {
    const { addSubscriber } = await import("@/lib/subscribers");
    const result = addSubscriber("user@example.com");
    expect(result).toEqual({ success: true, alreadyExists: false });
  });

  it("rejects a duplicate email", async () => {
    const { addSubscriber } = await import("@/lib/subscribers");
    addSubscriber("dup@example.com");
    const result = addSubscriber("dup@example.com");
    expect(result).toEqual({ success: false, alreadyExists: true });
  });

  it("increments the subscriber count", async () => {
    const { addSubscriber, getSubscriberCount } = await import("@/lib/subscribers");
    const before = getSubscriberCount();
    addSubscriber(`unique-${Date.now()}@example.com`);
    expect(getSubscriberCount()).toBe(before + 1);
  });
});
