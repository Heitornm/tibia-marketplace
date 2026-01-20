"use client";

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const MOCK_ITEMS = [
  { name: "Golden Armor", img: "https://tibiawiki.com.br/images/a/a2/Golden_Armor.gif" },
  { name: "Boots of Haste", img: "https://tibiawiki.com.br/images/d/d4/Boots_of_Haste.gif" },
  { name: "Dragon Scale Mail", img: "https://tibiawiki.com.br/images/e/e0/Dragon_Scale_Mail.gif" }
];

export default function ItemCarousel() {
  const [mounted, setMounted] = useState(false);
  
  // Inicialização do Embla com Autoplay
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  // Previne erros de Hidratação/SSR no Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-48" />; // Placeholder enquanto carrega

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      <div className="overflow-hidden bg-zinc-900/50 border border-amber-900/20 rounded-2xl p-6" ref={emblaRef}>
        <div className="flex">
          {MOCK_ITEMS.map((item, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4">
              <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-xl border border-amber-900/10 hover:border-amber-500/30 transition-colors group">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-16 h-16 object-contain pixelated group-hover:scale-110 transition-transform" 
                  onError={(e) => (e.currentTarget.src = "https://tibiawiki.com.br/images/8/86/Backpack.gif")}
                />
                <span className="mt-2 text-amber-200 font-bold text-sm">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}