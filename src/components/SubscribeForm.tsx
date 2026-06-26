"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions";

const initial: SubscribeState = { status: "idle", message: "" };

export function SubscribeForm() {
  const [state, action, isPending] = useActionState(subscribeAction, initial);

  return (
    <form action={action} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        name="email"
        required
        placeholder="votre@email.com"
        disabled={isPending || state.status === "success"}
        className="flex-1 px-4 py-3 rounded-full border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-800 placeholder:text-slate-400"
      />
      <button
        type="submit"
        disabled={isPending || state.status === "success"}
        className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60"
      >
        {isPending ? "..." : "S'inscrire"}
      </button>

      {state.message && (
        <p
          role="status"
          className={`absolute mt-14 text-sm ${
            state.status === "success"
              ? "text-emerald-600"
              : state.status === "duplicate"
              ? "text-amber-600"
              : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
