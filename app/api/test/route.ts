import prisma from "@/lib/prisma";

export async function GET() {
  const cat = await prisma.category.create({ data: { name: "IT" } });
  await prisma.studyPath.updateMany({ data: { categoryId: cat.id } });
}
