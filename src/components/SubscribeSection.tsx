import { SubscribeForm } from "./SubscribeForm";
import { SubscriberCount } from "./SubscriberCount";

// Server Component — composes a Client Component (SubscribeForm)
// and another Server Component (SubscriberCount)
export function SubscribeSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Restez informé
        </h2>
        <p className="text-slate-500 mb-8">
          Recevez les mises à jour du starter directement dans votre boîte mail.
        </p>
        <div className="relative flex flex-col items-center gap-4">
          <SubscribeForm />
          <SubscriberCount />
        </div>
      </div>
    </section>
  );
}
