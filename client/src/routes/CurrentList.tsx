import { useEffect, useState } from "react";
import { useCurrentList } from "@/context/ListContext";
import { toast } from "react-toastify";
import type { IngredientInChecklist } from "@/types/ingredient.types";
import ChecklistItem from "@/components/ChecklistItem";
import { Header } from "@/components/Header";
import emptyBox from "@/assets/illu/empty_box.png";
import { Button } from "@/components/ui/button";
import { createList, fetchList } from "@/services/list.services";

// TODO: bought in ingredient list and recipe list are not in sync
// TODO: file is too long, consider splitting it

export type ListData = {
  listId: number;
  ingredients: IngredientInChecklist[];
  recipes: { id: number; name: string; ingredients: IngredientInChecklist[] }[];
};

export const CurrentList = () => {
  const { currentListId, setCurrentListId } = useCurrentList();
  const [list, setList] = useState<ListData | null>(null);
  const [displayRecipe, setDisplayRecipe] = useState(true);

  const handleNewList = async () => {
    try {
      const newListId = await createList();

      if (!newListId) {
        throw new Error("No new list ID returned");
      }

      setCurrentListId(newListId);

      toast.success("Nouvelle liste créée !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de la nouvelle liste.");
    }
  };

  useEffect(() => {
    if (!currentListId) return;

    const getList = async () => {
      try {
        const data = await fetchList(currentListId);
        setList(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération de la liste");
      }
    };

    getList();
  }, [currentListId]);

  if (!list) return <p>Chargement...</p>;

  return (
    <>
      <Header title="Liste de courses" />

      <section className="flex flex-col items-center h-full pb-24 overflow-scroll relative">
        {list.ingredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="font-subtitle text-2xl text-white">
              Aucun ingrédient dans la liste
            </p>
            <img src={emptyBox} className="w-64 h-auto" />
          </div>
        ) : (
          <>
            <div className="w-full flex justify-end px-4 pb-2">
              <button
                onClick={() => setDisplayRecipe(!displayRecipe)}
                className="cursor-pointer text-sm text-gray hover:text-primary font-semibold"
              >
                {displayRecipe ? "Par ingrédients" : "Par recettes"}
              </button>
            </div>
            {displayRecipe ? (
              <div className="flex flex-col gap-8">
                {list.recipes.map((recipe) => (
                  <div key={recipe.id}>
                    <h3 className="text-lg font-semibold text-white pb-4 pl-8">
                      {recipe.name}
                    </h3>
                    <div className="flex flex-col gap-4 px-24">
                      {recipe.ingredients.map((ingredient) => (
                        <ChecklistItem
                          item={ingredient}
                          currentListId={list.listId}
                          setList={setList}
                          key={ingredient.id}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-24">
                {list.ingredients.map((ingredient) => (
                  <ChecklistItem
                    item={ingredient}
                    currentListId={list.listId}
                    setList={setList}
                    key={ingredient.id}
                  />
                ))}
              </div>
            )}
          </>
        )}
        <Button
          onClick={handleNewList}
          className="flex-end text-lg cursor-pointer my-16"
        >
          Nouvelle liste
        </Button>
      </section>
    </>
  );
};
