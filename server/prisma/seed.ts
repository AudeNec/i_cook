import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.info("🌱 Seeding database...");

  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "Oignon rouge", unit: "pièce" },
      { name: "Ail", unit: "gousse" },
      { name: "Chèvre frais", unit: "g" },
      { name: "Pâte à tarte", unit: "pièce" },
      { name: "Crème épaisse", unit: "ml" },
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

  console.info(`✅ Seeded ${ingredients.count} ingredients`);

  const recipe = await prisma.recipe.create({
    data: {
      name: "Tarte chèvre-miel & oignons confits",
    },
  });

  console.info(`✅ Created recipe: ${recipe.name}`);

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
        quantity: 5,
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
        quantity: 5,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Huile d'olive"),
        quantity: 30,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Vinaigre balsamique noir"),
        quantity: 30,
      },
      {
        recipeId: recipe.id,
        ingredientId: findId("Moutarde"),
        quantity: 5,
      },
    ],
  });

  console.info(`✅ Linked ingredients to recipe`);

  console.info("🌱 Done seeding!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
