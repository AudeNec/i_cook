import ChecklistItem from "@/components/ChecklistItem";
import EmptyBox from "@/components/EmptyBox";
import Header from "@/components/Header";
import ListByRecipe from "@/components/ListByRecipe";

import { Button } from "@/components/ui/button";

import { useCurrentListData } from "@/hooks/useCurrentList";
import { useState } from "react";

export const CurrentList = () => {
  const { list, setList, handleNewList } = useCurrentListData();
  const [displayRecipe, setDisplayRecipe] = useState(false);

  if (!list) return <p>Chargement...</p>;

  return (
    <>
      <Header title="Liste de courses" />

      <section className="flex flex-col items-center h-full pb-24 overflow-scroll relative">
        {list.ingredients.length === 0 ? (
          <EmptyBox />
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
              <ListByRecipe list={list} setList={setList} />
            ) : (
              <div className="flex flex-col gap-4 px-24">
                {list.ingredients.map((ingredient) => (
                  <ChecklistItem
                    item={ingredient}
                    currentListId={list.id}
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
