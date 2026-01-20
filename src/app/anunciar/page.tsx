"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Info, ArrowRight } from "lucide-react";
import { Item } from "@/types";

export default function AnunciarPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    itemId: "",
    price: "",
    world: "",
    contact: "",
  });

  // Busca os itens do banco (que você importará dos .ods)
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/ofertas");
        router.refresh();
      }
    } catch (error) {
      alert("Erro ao publicar oferta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-zinc-900 border border-amber-900/30 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-amber-600/20 p-3 rounded-lg">
            <PlusCircle className="text-amber-500" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Nova Oferta</h1>
            <p className="text-gray-400 text-sm">Preencha os dados para anunciar seu item.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção do Item */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-amber-500">Qual item você quer vender?</label>
            <select
              required
              className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-600 outline-none appearance-none"
              value={formData.itemId}
              onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
            >
              <option value="">Selecione um item (Legs, Boots, Armor...)</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preço */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500">Preço (GP ou Coins)</label>
              <input
                required
                type="text"
                placeholder="Ex: 50k ou 250 TC"
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-600 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            {/* Mundo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500">Seu Mundo</label>
              <input
                required
                type="text"
                placeholder="Ex: Antica, Belobra..."
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-600 outline-none"
                value={formData.world}
                onChange={(e) => setFormData({ ...formData, world: e.target.value })}
              />
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-amber-500">Seu Personagem / Contato</label>
            <input
              required
              type="text"
              placeholder="Ex: Nome do Personagem ou Discord"
              className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-600 outline-none"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>

          {/* Aviso Legal Discreto */}
          <div className="flex gap-3 bg-amber-900/10 p-4 rounded-lg border border-amber-900/20">
            <Info className="text-amber-600 shrink-0" size={20} />