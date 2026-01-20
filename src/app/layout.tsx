import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "@/components/ui/Sidebar";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tibia Marketplace | Aprendizado",
  description: "Marketplace de itens de Tibia para fins de portfólio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-[#050505] text-white flex min-h-screen`}>
        <Sidebar />
        <div className="flex-1 flex flex-col ml-20 transition-all"> 
          <main className="flex-grow p-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}