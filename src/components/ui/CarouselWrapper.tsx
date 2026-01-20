"use client"; // Define que este arquivo é do cliente

import dynamic from 'next/dynamic';

// Agora o dynamic com ssr: false é permitido porque estamos em um Client Component
const DynamicCarousel = dynamic(() => import('./EmblaCarousel'), { 
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-zinc-800 rounded-2xl" /> 
});

export default function CarouselWrapper() {
  return <DynamicCarousel />;
}