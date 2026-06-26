import { getSubscriberCount } from "@/lib/subscribers";

export async function SubscriberCount() {
  const count = await getSubscriberCount();
  return (
    <p className="text-sm text-slate-400">
      {count === 0
        ? "Soyez le premier inscrit !"
        : `${count} développeur${count > 1 ? "s" : ""} déjà inscrit${count > 1 ? "s" : ""}`}
    </p>
  );
}
