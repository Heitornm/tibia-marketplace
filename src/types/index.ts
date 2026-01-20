export interface Item {
  id: string;
  name: string;
  category: 'Legs' | 'Boots' | 'Armaduras' | 'Espadas' | 'Machados' | 'Escudos' | 'Outros';
  imageUrl?: string;
  attributes?: string; // Ex: "Arm: 14, Speed: +10"
  createdAt: Date;
}

export interface Offer {
  id: string;
  price: string;
  world: string;
  contact: string;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: Date;
  
  itemId: string;
  item?: Item; // Relacionamento populado pelo Prisma
  
  userId?: string;
  user?: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  offers?: Offer[];
}

// Útil para formulários de criação de oferta
export type CreateOfferInput = O suitcase: {
  itemId: string;
  price: string;
  world: string;
  contact: string;
}