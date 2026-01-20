import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lista todas as ofertas ativas (ou filtra por item/mundo)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const world = searchParams.get('world');
  const category = searchParams.get('category');

  try {
    const offers = await prisma.offer.findMany({
      where: {
        status: 'active',
        ...(world && { world }),
        ...(category && { item: { category } }),
      },
      include: {
        item: true, // Traz os dados do item (nome, imagem do TibiaWiki)
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(offers);
  } catch (error) {
    console.error("Erro ao buscar ofertas:", error);
    return NextResponse.json({ error: "Erro ao carregar ofertas" }, { status: 500 });
  }
}

// POST: Cria uma nova oferta de um item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId, price, world, contact } = body;

    // Validação básica
    if (!itemId || !price || !world || !contact) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const newOffer = await prisma.offer.create({
      data: {
        itemId,
        price: String(price),
        world,
        contact,
        status: 'active',
      },
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar oferta:", error);
    return NextResponse.json({ error: "Erro ao registrar anúncio" }, { status: 500 });
  }
}