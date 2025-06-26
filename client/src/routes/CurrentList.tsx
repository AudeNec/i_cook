import { useEffect, useState } from "react";
import { useCurrentList } from "../context/ListContext";
import { fetchList } from "../services/getList.service";
import { toast } from "react-toastify";
import type { IngredientWithQuantity } from "../types/ingredient.types";
import { ChecklistItem } from "@/components/ChecklistItem";
import { Header } from "@/components/Header";
import emptyBox from "@/assets/illu/empty_box.png";

export type ListData = {
  listId: number;
  ingredients: IngredientWithQuantity[];
};

export const CurrentList = () => {
  const { currentListId } = useCurrentList();
  const [list, setList] = useState<ListData | null>(null);

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
    <section>
      <Header content="Liste de courses" />
      {list.ingredients.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="font-subtitle text-2xl text-white">
            Aucun ingrédient dans la liste
          </p>
          <img src={emptyBox} className="w-64 h-auto" />
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
    </section>
  );
};
