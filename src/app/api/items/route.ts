import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Retorna a lista de itens para o catálogo ou formulários
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  try {
    const items = await prisma.item.findMany({
      where: {
        // Filtra por categoria se for passado no query param (ex: ?category=Legs)
        ...(category && { category }),
        // Filtra por nome se houver uma busca (case insensitive)
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        name: 'asc',
      },
      // Limitamos a 100 para não sobrecarregar o select do front-end
      take: 100, 
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens do catálogo:", error);
    return NextResponse.json(
      { error: "Erro ao carregar catálogo de itens" }, 
      { status: 500 }
    );
  }
}

/** * Nota de ADS: 
 * Este endpoint é essencial para o componente de "Combobox" ou "Autocomplete" 
 * na página de anunciar. O usuário digita "Golden" e a API retorna 
 * o item "Golden Armor" do banco para garantir a integridade referencial.
 */