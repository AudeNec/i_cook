import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "@/App";

import { NewRecipe } from "@/routes/NewRecipe";
import { getRecipeDetails } from "@/services/recipe.services";
import { Home } from "@/routes/Home";
import { CurrentList } from "@/routes/CurrentList";
import { RecipeDetails } from "@/routes/RecipeDetails";
import { Recipes } from "@/routes/Recipes";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recettes",
        element: <Recipes />,
      },
      {
        path: "/recettes/:id",
        element: <RecipeDetails />,
        loader: ({ params }) => {
          return getRecipeDetails(params.id ? Number(params.id) : 0);
        },
      },
      {
        path: "/liste",
        element: <CurrentList />,
      },
      {
        path: "/recettes/nouvellerecette",
        element: <NewRecipe />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
