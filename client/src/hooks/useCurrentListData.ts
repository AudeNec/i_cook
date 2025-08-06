import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchList, createList } from "@/services/list.services";
import { useCurrentList } from "@/context/ListContext";

import type { List } from "@/types/list.types";

export const useCurrentListData = (): {
  list: List | null;
  setList: React.Dispatch<React.SetStateAction<List | null>>;
  handleNewList: () => Promise<void>;
  currentListId: number | null;
} => {
  const { currentListId, setCurrentListId } = useCurrentList();
  const [list, setList] = useState<List | null>(null);

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

  const handleNewList = async (): Promise<void> => {
    try {
      const newListId = await createList();
      if (!newListId) throw new Error("No new list ID returned");
      setCurrentListId(newListId);
      toast.success("Nouvelle liste créée !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de la nouvelle liste.");
    }
  };

  return { list, setList, handleNewList, currentListId };
};
