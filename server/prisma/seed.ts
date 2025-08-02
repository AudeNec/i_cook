import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.info("🌱 Seeding database...");

  await prisma.unit_Conversion.createMany({
    data: [
      {
        unit: "càc",
        conversion: 5,
      },
      {
        unit: "càs",
        conversion: 15,
      },
      {
        unit: "g",
        conversion: 1,
      },
      {
        unit: "ml",
        conversion: 1,
      },
    ],
    skipDuplicates: true,
  });

  console.info(`✅ Seeded conversion table`);

  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "Oignon rouge", convertible: false },
      { name: "Ail", convertible: false },
      { name: "Chèvre frais", convertible: true },
      { name: "Pâte à tarte", convertible: false },
      { name: "Crème épaisse", convertible: true },
      { name: "Fromage râpé", convertible: true },
      { name: "Noix concassées", convertible: true },
      { name: "Origan séché", convertible: true },
      { name: "Huile d'olive", convertible: true },
      { name: "Vinaigre balsamique noir", convertible: true },
      { name: "Moutarde", convertible: true },
      { name: "Miel", convertible: true },
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
