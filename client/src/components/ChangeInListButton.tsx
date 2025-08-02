import { toast } from "react-toastify";
import { ListPlus } from "lucide-react";
import { ListX } from "lucide-react";
import { useState, useEffect } from "react";

import {
  changeRecipeInList,
  getIsRecipeInList,
} from "@/services/list.services";
import { useCurrentList } from "@/context/ListContext";
import ErrorPage from "@/components/ErrorPage";

type changeInListProps = {
  id: string;
};

export default function ChangeInListButton({ id }: changeInListProps) {
  const { currentListId } = useCurrentList();
  const [isInList, setIsInList] = useState<boolean>(false);

  if (!currentListId) {
    return <ErrorPage error={"Ta liste de course est introuvable."} />;
  }

  useEffect(() => {
    const isRecipeInList = async (listId: string, recipeId: string) => {
      try {
        const result = await getIsRecipeInList(listId, recipeId);
        setIsInList(result.isInList);
      } catch (error) {
        toast.error("Une erreur est survenue.", { theme: "dark" });
      }
    };

    isRecipeInList(currentListId.toString(), id);
  }, [currentListId, id]);

  const changeInList = async (recipeId: string) => {
    try {
      const message = await changeRecipeInList(recipeId);
      setIsInList(!isInList);
      toast.success(message, { theme: "dark" });
    } catch (error) {
      toast.error(`Une erreur est survenue.`, { theme: "dark" });
    }
  };

  return (
    <button
      type="button"
      onClick={() => changeInList(id)}
      onKeyUp={() => changeInList(id)}
      className={`bg-white text-black flex justify-center content-center rounded-full p-2 w-10 h-10 text-lg font-bold opacity-80 ${
        isInList ? "hover:bg-orange" : "hover:bg-primary"
      } hover:text-white cursor-pointer transition-colors duration-300`}
    >
      {isInList ? <ListX /> : <ListPlus />}
    </button>
  );
}
