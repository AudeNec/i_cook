import { useEffect, useState } from "react";
import { useCurrentList } from "../context/ListContext";

import type { List } from "../types/list.types";
import { fetchList } from "../services/getList.service";
import { toast } from "react-toastify";

export const CurrentList = () => {
  const { currentListId } = useCurrentList();
  const [list, setList] = useState<List | null>(null);

  if (!currentListId) {
    return <p>Chargement de la liste...</p>;
  }

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await fetchList(currentListId);
        if (!data) {
          throw new Error("Liste introuvable");
        }
        setList(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération de la liste:" + error);
      }
    };
    getList();
  }, [currentListId]);

  return (
    <>
      <header>
        <h1>Liste de courses</h1>
      </header>
      <section>
        {list?.recipes &&
          list.recipes.map((item) => {
            return item.name;
          })}
        {list?.ingredients &&
          list.ingredients.map((item) => {
            return item.name;
          })}
      </section>
    </>
  );
};
