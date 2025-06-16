import { useLoaderData } from "react-router-dom";

export const RecipeDetails = () => {
  const recipe = useLoaderData();
  return (
    <>
      <header>
        <h1>{recipe.name}</h1>
      </header>
      <section>details</section>
    </>
  );
};
