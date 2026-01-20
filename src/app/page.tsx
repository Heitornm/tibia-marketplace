"use client";

import dynamic from 'next/dynamic';

// Isso desativa a renderização no servidor para este componente específico
const ItemCarousel = dynamic(() => import('@/components/ui/EmblaCarousel'), { 
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-zinc-800 rounded-2xl" /> 
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen pt-10 px-4">
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-serif font-bold text-amber-600 tracking-tight">
          Marketplace de Tibia
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          O lugar definitivo para negociar seus equipamentos. Encontre as melhores ofertas de armaduras, pernas e botas de todos os mundos.
        </p>
      </section>

      <section className="w-full max-w-5xl bg-amber-900/5 p-8 rounded-2xl border border-amber-900/20">
        <h2 className="text-2xl font-semibold text-amber-500 mb-6 flex items-center gap-2">
          🔥 Itens em Destaque
        </h2>
        <ItemCarousel />
      </section>
    </main>
  );
}