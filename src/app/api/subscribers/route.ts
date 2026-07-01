import { getSubscribers } from "@/lib/subscribers";

export async function GET(_request: Request): Promise<Response> {
  try {
    const subscribers = await getSubscribers();
    return Response.json({ subscribers, count: subscribers.length });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
