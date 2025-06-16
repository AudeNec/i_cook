import express from "express";
import recipeActions from "./modules/recipe/recipeActions";
import ingredientActions from "./modules/ingredient/ingredientActions";
import listActions from "./modules/list/listActions";
import monthActions from "./modules/month/monthActions";

const router = express.Router();

router.get("/api/recipes", recipeActions.browse);
router.get("/api/recipes/:id", recipeActions.read);
router.post("/api/recipes/add", recipeActions.add);

router.get("/api/ingredients", ingredientActions.browse);

router.get("/api/months", monthActions.browse);

router.get("/api/lists/current", listActions.findCurrent);
router.get("/api/lists/search/:id", listActions.read);
router.post("/api/lists", listActions.add);
router.put("/api/lists/recipes/:id", listActions.changeRecipe);

export default router;
