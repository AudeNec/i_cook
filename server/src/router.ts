import express from "express";
import recipeActions from "./modules/recipe/recipe.actions";
import ingredientActions from "./modules/ingredient/ingredient.actions";
import listActions from "./modules/list/list.actions";

const router = express.Router();

router.get("/api/recipes", recipeActions.browse);
router.get("/api/recipes/:id", recipeActions.read);
router.get("/api/recipes/:recipeId/:listId", recipeActions.isInList);
router.post("/api/recipes/add", recipeActions.add);

router.get("/api/ingredients", ingredientActions.browse);
router.post("api/ingredients/add", ingredientActions.add);

router.get("/api/lists/current", listActions.findCurrent);
router.get("/api/lists/search/:id", listActions.read);
router.post("/api/lists", listActions.add);
router.put("/api/lists/recipes/:id", listActions.changeRecipe);
router.patch(
  "/api/lists/:listId/ingredients/:ingredientId",
  listActions.updateIngredientBought
);

export default router;
