export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-auto border-t border-amber-900/10 bg-black/20">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Informações Legais
        </p>
        <p className="text-sm text-gray-400">
          Todo o conteúdo informativo dos itens e imagens são provenientes do <strong>TibiaWiki</strong> e pertencem à <strong>CipSoft GmbH</strong>.
        </p>
        <p className="text-[10px] text-gray-600 italic">
          Este projeto é uma iniciativa particular para fins de aprendizado e portfólio, desenvolvido por um fã para a comunidade de Tibia.
        </p>
      </div>
    </footer>
  );
}
