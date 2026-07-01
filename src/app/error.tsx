"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <h2 className="text-2xl font-bold text-slate-900">Une erreur est survenue</h2>
      <p className="text-slate-500 max-w-md">
        Quelque chose s&apos;est mal passé. Réessayez ou revenez plus tard.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
