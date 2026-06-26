import { getSubscriberCount } from "@/lib/subscribers";

// Server Component — runs on the server, no "use client"
export function SubscriberCount() {
  const count = getSubscriberCount();
  return (
    <p className="text-sm text-slate-400">
      {count === 0
        ? "Soyez le premier inscrit !"
        : `${count} développeur${count > 1 ? "s" : ""} déjà inscrit${count > 1 ? "s" : ""}`}
    </p>
  );
}
