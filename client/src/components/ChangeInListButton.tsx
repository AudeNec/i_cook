import { toast } from "react-toastify";
import { useCurrentList } from "../context/ListContext";
import { useState, useEffect } from "react";
import { getIsRecipeInList } from "../services/getIsRecipeInList.service";
import { Plus } from "./animate-ui/icons/plus";
import { X } from "./animate-ui/icons/x";

type changeInListProps = {
  id: string;
};

export const ChangeInListButton = ({ id }: changeInListProps) => {
  const { currentListId } = useCurrentList();
  const [isInList, setIsInList] = useState<boolean>(false);

  if (!currentListId) {
    return null;
  }

  useEffect(() => {
    const isInList = async (listId: string, recipeId: string) => {
      const result = await getIsRecipeInList(listId, recipeId);
      setIsInList(result.isInList);
    };
    isInList(currentListId.toString(), id);
  }, [currentListId, id]);

  const changeInList = async (recipeId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lists/recipes/${recipeId}`,
        { method: "PUT" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const message = await response.json();
      setIsInList(!isInList);
      toast.success(message, { theme: "dark" });
    } catch (error) {
      toast.error(
        `There has been an error while changing the recipe in the list`,
        { theme: "dark" }
      );
    }
  };

  return (
    <button
      type="button"
      onClick={() => changeInList(id)}
      onKeyUp={() => changeInList(id)}
      className="bg-white text-primary-dark rounded-full p-2 w-10 h-10 text-lg font-bold hover:bg-primary hover:text-white cursor-pointer transition-colors duration-300 flex justify-center content-center"
    >
      {isInList ? <X animateOnHover /> : <Plus animateOnHover />}
    </button>
  );
};
