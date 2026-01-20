"use client";

import Link from "next/link";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-zinc-900 border border-amber-900/20 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="bg-amber-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-amber-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
          <p className="text-gray-400 text-sm">Junte-se à comunidade de comércio</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-amber-500 uppercase">Nome no Jogo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-600 outline-none" placeholder="Seu Main Char" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-amber-500 uppercase">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input type="email" className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-600 outline-none" placeholder="seu@email.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-amber-500 uppercase">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input type="password" className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-600 outline-none" placeholder="••••••••" />
            </div>
          </div>

          <button className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 rounded-lg transition-all mt-6">
            Registrar Agora
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-amber-500 hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}