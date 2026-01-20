"use client";

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const MOCK_ITEMS = [
  { name: "Golden Armor", img: "https://tibiawiki.com.br/images/a/a2/Golden_Armor.gif" },
  { name: "Boots of Haste", img: "https://tibiawiki.com.br/images/d/d4/Boots_of_Haste.gif" },
  { name: "Dragon Scale Mail", img: "https://tibiawiki.com.br/images/e/e0/Dragon_Scale_Mail.gif" }
];

export default function EmblaCarousel() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Inicializamos o hook SEM o plugin no array para evitar o erro de build/runtime
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Inicialização manual do Autoplay assim que a API estiver pronta
  useEffect(() => {
    if (emblaApi) {
      const autoplay = Autoplay({ delay: 3000 });
      emblaApi.plugins().autoplay = autoplay; 
    }
  }, [emblaApi]);

  if (!isMounted) return <div className="h-48 bg-zinc-900 rounded-2xl animate-pulse" />;

  return (
    <div className="overflow-hidden bg-zinc-900/50 border border-amber-900/20 rounded-2xl p-6" ref={emblaRef}>
      <div className="flex">
        {MOCK_ITEMS.map((item, index) => (
          <div key={index} className="flex-[0_0_100%] md:flex-[0_0_33.33%] px-4 flex flex-col items-center">
            <div className="bg-black/40 p-4 rounded-xl border border-amber-900/20">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-contain pixelated" />
            </div>
            <span className="mt-2 text-amber-200 font-bold text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}