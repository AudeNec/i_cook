import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { addRecipe } from "@/services/recipe.services";
import type {
  Ingredient,
  IngredientInRecipeForm,
} from "@/types/ingredient.types";
import { fetchIngredients } from "@/services/ingredient.services";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "@/components/animate-ui/icons/trash";

// TODO: file is too long, consider splitting it

export const NewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState<
    IngredientInRecipeForm[]
  >([]);
  const [existingIngredients, setExistingIngredients] = useState<Ingredient[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchIngredients();
        setExistingIngredients(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des ingrédients.");
      }
    })();
  }, []);

  const addIngredient = ({ isNew }: { isNew: boolean }) => {
    setRecipeIngredients([
      ...recipeIngredients,
      {
        id: isNew ? "new" : "",
        name: "",
        quantity: 1,
        unit: "",
        isNew: isNew,
      },
    ]);
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const updated = [...recipeIngredients];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "id" && !updated[index].isNew) {
      const existing = existingIngredients.find((ing) => ing.id === value);
      if (existing) {
        updated[index].unit = existing.unit;
        updated[index].name = existing.name;
      }
    }

    setRecipeIngredients(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Le nom de la recette est requis.");
      return;
    }

    if (recipeIngredients.length === 0) {
      toast.error("Au moins un ingrédient est requis.");
      return;
    }

    try {
      const recipeData = {
        name: recipeName,
        ingredients: recipeIngredients.map((ing) => ({
          id: ing.isNew ? "new" : ing.id,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          bought: false,
        })),
      };

      await addRecipe(recipeData);
      toast.success("Recette ajoutée avec succès !");

      // Reset form
      setRecipeName("");
      setRecipeIngredients([]);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la recette.");
    }
  };

  return (
    <>
      <Header title="Nouvelle recette" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-24">
        <Input
          type="text"
          placeholder="Nom de la recette"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="text-xl text-center font-subtitle mb-4 h-24 border-none"
        />

        <h3 className="text-white text-center">Liste des ingrédients</h3>

        <Table>
          <TableBody>
            {recipeIngredients.map((ingredient, index) => (
              <TableRow key={index}>
                <TableCell className="w-1/2">
                  {!ingredient.isNew ? (
                    <Select
                      onValueChange={(value: string) =>
                        updateIngredient(index, "id", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir">
                          {ingredient.name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {existingIngredients.map((ing) => (
                          <SelectItem key={ing.id} value={ing.id}>
                            {ing.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      placeholder="Nom"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(index, "name", e.target.value)
                      }
                    />
                  )}
                </TableCell>

                <TableCell className="w-1/6">
                  <Input
                    type="string"
                    step="any"
                    placeholder="Quantité"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      updateIngredient(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>

                <TableCell className="w-1/4">
                  {ingredient.isNew ? (
                    <Input
                      placeholder="Unité"
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateIngredient(index, "unit", e.target.value)
                      }
                    />
                  ) : (
                    <p className="flex items-center px-3 text-white">
                      {ingredient.unit}
                    </p>
                  )}
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => removeIngredient(index)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex gap-2 px-4">
          <Button
            type="button"
            onClick={() => addIngredient({ isNew: false })}
            variant="secondary"
            className="flex-1"
          >
            Ajouter ingrédient existant
          </Button>
          <Button
            type="button"
            onClick={() => addIngredient({ isNew: true })}
            variant="secondary"
            className="flex-1"
          >
            Nouvel ingrédient
          </Button>
        </div>

        <Button
          type="submit"
          className="bg-secondary hover:bg-secondary-dark m-4"
        >
          Enregistrer
        </Button>
      </form>
    </>
  );
};
