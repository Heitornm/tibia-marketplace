import { prisma } from "@/lib/prisma";
import { formatGP } from "@/lib/utils";
import { ShoppingBag, Search, Filter } from "lucide-react";

export default async function OfertasPage() {
  // Busca as ofertas do banco incluindo os dados do item relacionado
  const ofertas = await prisma.offer.findMany({
    where: { status: "active" },
    include: { item: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/20 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 flex items-center gap-3">
            <ShoppingBag /> Painel de Ofertas
          </h1>
          <p className="text-gray-400 mt-2">Explore os itens anunciados pela comunidade.</p>
        </div>

        {/* Barra de Busca Simples */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar item..." 
            className="bg-zinc-900 border border-amber-900/30 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500 transition-colors w-full md:w-64"
          />
        </div>
      </div>

      {/* Grid de Ofertas */}
      {ofertas.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <p className="text-gray-500 italic">Nenhuma oferta ativa no momento. Que tal registrar a primeira?</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ofertas.map((oferta) => (
            <div key={oferta.id} className="bg-zinc-900 border border-amber-900/20 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all group">
              {/* Header do Card (Imagem do TibiaWiki) */}
              <div className="h-32 bg-black/40 flex items-center justify-center border-b border-amber-900/10">
                <img 
                  src={oferta.item.imageUrl || "/images/placeholder.gif"} 
                  alt={oferta.item.name} 
                  className="w-12 h-12 group-hover:scale-110 transition-transform"
                />
              </div>

              {/* Detalhes da Oferta */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-amber-100">{oferta.item.name}</h3>
                  <span className="text-[10px] bg-amber-900/30 text-amber-500 px-2 py-1 rounded uppercase tracking-tighter">
                    {oferta.item.category}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-mono text-green-500 font-bold">
                    {formatGP(Number(oferta.price))}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    Mundo: <span className="text-gray-300">{oferta.world}</span>
                  </p>
                </div>

                <button className="w-full bg-amber-700 hover:bg-amber-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors mt-2">
                  Contactar Vendedor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}