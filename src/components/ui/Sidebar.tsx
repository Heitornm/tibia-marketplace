"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, PlusCircle, LogIn, LogOut, Sword } from 'lucide-react';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Provisório para teste

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-amber-900/30 text-gray-300 transition-all duration-300 ease-in-out z-50 ${isHovered ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className="flex items-center px-6 mb-10 text-amber-500">
          <Sword className="min-w-[32px]" />
          <span className={`ml-4 text-xl font-bold transition-opacity duration-300 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            Tibia Market
          </span>
        </div>

        {/* Navegação */}
        <nav className="flex-grow flex flex-col gap-2 px-4">
          <SidebarLink href="/" icon={<Home size={24} />} label="Tela Inicial" isOpen={isHovered} />
          <SidebarLink href="/ofertas" icon={<ShoppingBag size={24} />} label="Painel de Ofertas" isOpen={isHovered} />
          <SidebarLink href="/anunciar" icon={<PlusCircle size={24} />} label="Registrar Oferta" isOpen={isHovered} />
        </nav>

        {/* Footer da Sidebar (Login/Logoff) */}
        <div className="px-4 mt-auto pt-4 border-t border-amber-900/20">
          {isLoggedIn ? (
            <button className="flex items-center w-full p-3 text-red-400 hover:bg-red-950/20 rounded-md transition-colors">
              <LogOut size={24} />
              <span className={`ml-4 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>Sair</span>
            </button>
          ) : (
            <SidebarLink href="/login" icon={<LogIn size={24} />} label="Login" isOpen={isHovered} />
          )}
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label, isOpen }: { href: string, icon: React.ReactNode, label: string, isOpen: boolean }) {
  return (
    <Link href={href} className="flex items-center p-3 rounded-md hover:bg-amber-900/10 hover:text-amber-500 transition-colors group">
      <div className="min-w-[24px] group-hover:scale-110 transition-transform">{icon}</div>
      <span className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </span>
    </Link>
  );
}