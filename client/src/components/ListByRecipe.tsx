import ChecklistItem from "./ChecklistItem";

import type { Dispatch } from "react";
import type { List } from "@/types/list.types";
import type React from "react";
import { useChecklistByRecipe } from "@/hooks/useChecklistByRecipe";

type ListByRecipeProps = {
  list: List;
  setList: Dispatch<React.SetStateAction<List | null>>;
};

export default function ListByRecipe({ list, setList }: ListByRecipeProps) {
  const listByRecipe = useChecklistByRecipe(list.ingredients);

  return (
    <div className="flex flex-col gap-8">
      {listByRecipe.map((recipe) => (
        <div key={recipe.id}>
          <h3 className="text-lg font-semibold text-white pb-4 pl-8">
            {recipe.name}
          </h3>
          <div className="flex flex-col gap-4 px-24">
            {recipe.ingredients.map((ingredient) => (
              <ChecklistItem
                item={ingredient}
                setList={setList}
                key={ingredient.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
