import { describe, expect, it, vi, beforeEach } from "vitest";

const mockPrisma = {
  subscriber: {
    create: vi.fn(),
    count: vi.fn(),
    findUnique: vi.fn(),
  },
};

vi.mock("@/lib/db", () => ({ prisma: mockPrisma }));

describe("subscribers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a subscriber and returns success", async () => {
    mockPrisma.subscriber.create.mockResolvedValue({
      id: "1",
      email: "user@example.com",
      createdAt: new Date(),
    });

    const { createSubscriber } = await import("@/lib/subscribers");
    const result = await createSubscriber("user@example.com");

    expect(result).toEqual({ success: true, alreadyExists: false });
    expect(mockPrisma.subscriber.create).toHaveBeenCalledWith({
      data: { email: "user@example.com" },
    });
  });

  it("returns alreadyExists when email is duplicate", async () => {
    const { PrismaClientKnownRequestError } = await import("@/generated/prisma/internal/prismaNamespace");
    mockPrisma.subscriber.create.mockRejectedValue(
      new PrismaClientKnownRequestError("Unique constraint failed", {
        code: "P2002",
        clientVersion: "7.0.0",
      })
    );

    const { createSubscriber } = await import("@/lib/subscribers");
    const result = await createSubscriber("dup@example.com");

    expect(result).toEqual({ success: false, alreadyExists: true });
  });

  it("returns the subscriber count", async () => {
    mockPrisma.subscriber.count.mockResolvedValue(42);

    const { getSubscriberCount } = await import("@/lib/subscribers");
    const count = await getSubscriberCount();

    expect(count).toBe(42);
  });
});
