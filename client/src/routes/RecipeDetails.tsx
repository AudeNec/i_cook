import Header from "@/components/Header";
import { useLoaderData } from "react-router-dom";

export const RecipeDetails = () => {
  const recipe = useLoaderData();
  return (
    <>
      <Header title={recipe.title} />
      <section>details</section>
    </>
  );
};
