export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-amber-50 pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
          Starter Kit
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Bienvenue sur mon bootstrap NextJS
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
          Un starter propre avec Next.js, Vitest, Tailwind et oxlint — prêt à l&apos;emploi.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Commencer
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-full border border-amber-400 text-amber-600 font-semibold hover:bg-amber-50 transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </section>
  );
}
