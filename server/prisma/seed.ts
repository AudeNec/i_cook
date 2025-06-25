import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "Oignon rouge", unit: "pièce" },
      { name: "Ail", unit: "gousse" },
      { name: "Chèvre frais", unit: "g" },
      { name: "Pâte à tarte", unit: "rouleau" },
      { name: "Crème épaisse", unit: "g" },
      { name: "Fromage râpé", unit: "g" },
      { name: "Noix concassées", unit: "g" },
      { name: "Origan séché", unit: "càc" },
      { name: "Huile d'olive", unit: "càs" },
      { name: "Vinaigre balsamique noir", unit: "càs" },
      { name: "Moutarde", unit: "càc" },
      { name: "Miel", unit: "càc" },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${ingredients.count} ingredients`);

  const recipe = await prisma.recipe.create({
    data: {
      name: "Tarte chèvre-miel & oignons confits",
    },
  });

  console.log(`✅ Created recipe: ${recipe.name}`);

  const ingredientMap = await prisma.ingredient.findMany();

  const findId = (name: string) =>
    ingredientMap.find((i) => i.name === name)?.id ?? 0;

  await prisma.recipe_ingredient.createMany({
    data: [
      {
        recipeId: recipe.id,
        ingredientId: findId("Oignon rouge"),
        quantity: 3,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Ail"),
        quantity: 1,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Chèvre frais"),
        quantity: 100,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Pâte à tarte"),
        quantity: 1,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Miel"),
        quantity: 1,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Crème épaisse"),
        quantity: 50,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Fromage râpé"),
        quantity: 75,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Noix concassées"),
        quantity: 50,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Origan séché"),
        quantity: 1,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Huile d'olive"),
        quantity: 2,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Vinaigre balsamique noir"),
        quantity: 2,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Moutarde"),
        quantity: 1,
      },
    ],
  });

  console.log(`✅ Linked ingredients to recipe`);

  console.log("🌱 Done seeding!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
