import { describe, expect, it, vi, beforeEach } from "vitest";

const mockPrisma = {
  subscriber: {
    findMany: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
  },
};

vi.mock("@/lib/db", () => ({ prisma: mockPrisma }));

describe("GET /api/subscribers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("returns 200 with empty array when no subscribers", async () => {
    mockPrisma.subscriber.findMany.mockResolvedValue([]);

    const { GET } = await import("@/app/api/subscribers/route");
    const response = await GET(new Request("http://localhost/api/subscribers"));

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.subscribers).toEqual([]);
    expect(body.count).toBe(0);
  });

  it("returns 500 when the database throws", async () => {
    mockPrisma.subscriber.findMany.mockRejectedValue(new Error("DB connection failed"));

    const { GET } = await import("@/app/api/subscribers/route");
    const response = await GET(new Request("http://localhost/api/subscribers"));

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it("returns 200 with a list of subscribers", async () => {
    mockPrisma.subscriber.findMany.mockResolvedValue([
      { id: "1", email: "alice@example.com", createdAt: new Date("2026-01-01") },
    ]);

    const { GET } = await import("@/app/api/subscribers/route");
    const response = await GET(new Request("http://localhost/api/subscribers"));

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.subscribers).toHaveLength(1);
    expect(body.subscribers[0].email).toBe("alice@example.com");
    expect(body.count).toBe(1);
  });
});
