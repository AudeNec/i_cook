import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";

import { Add } from "./routes/Add";
import { getRecipeDetails } from "./services/getRecipeDetails.service";
import { Home } from "./routes/Home";
import { CurrentList } from "./routes/CurrentList";
import { RecipeDetails } from "./routes/RecipeDetails";
import { Recipes } from "./routes/Recipes";

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
        path: "/recettes/ajouter",
        element: <Add />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
