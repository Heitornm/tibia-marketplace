import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import path from 'path';

const prisma = new PrismaClient();

function getDataFromODS(fileName: string, category: string) {
  const filePath = path.join(process.cwd(), fileName);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Usamos header: 1 para obter um array de arrays (onde cada sub-array é uma linha)
  // Isso garante que peguemos as colunas pela posição exata (A, B, C...)
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];

  // Filtramos a primeira linha (cabeçalho) e mapeamos o restante
  // row[0] = Coluna A (Nome)
  // row[1] = Coluna B (Atributos)
  // row[2] = Coluna C (URL da Imagem)
  return rows.slice(1)
    .filter(row => row[0]) // Garante que a linha não está vazia
    .map((row: any) => ({
      name: String(row[0]).trim(),
      category: category,
      attributes: row[1] ? String(row[1]).trim() : "",
      imageUrl: row[2] ? String(row[2]).trim() : null // Pega exatamente o endereço da coluna C
    }));
}

async function main() {
  console.log("🚀 Iniciando importação de itens para o banco Neon...");

  const files = [
    { name: 'armaduras_ok.ods', cat: 'Armaduras' },
    { name: 'boots_ok.ods', cat: 'Boots' },
    { name: 'legs_ok.ods', cat: 'Legs' }
  ];

  for (const file of files) {
    console.log(`📦 Processando categoria: ${file.cat}...`);
    const items = getDataFromODS(file.name, file.cat);
    
    for (const item of items) {
      // O upsert evita duplicidade: se o nome já existir, ele apenas atualiza os dados
      await prisma.item.upsert({
        where: { name: item.name },
        update: {
          category: item.category,
          attributes: item.attributes,
          imageUrl: item.imageUrl,
        },
        create: {
          name: item.name,
          category: item.category,
          attributes: item.attributes,
          imageUrl: item.imageUrl,
        },
      });
    }
    console.log(`✅ ${items.length} itens de ${file.cat} importados.`);
  }

  console.log("✨ Importação finalizada com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });