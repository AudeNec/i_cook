import { useLoaderData } from "react-router-dom";

import Header from "@/components/Header";

export const RecipeDetails = () => {
  const recipe = useLoaderData();
  return (
    <>
      <Header title={recipe.title} />
      <section>details</section>
    </>
  );
};
