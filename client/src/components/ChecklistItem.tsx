import { toast } from "react-toastify";

import { Checkbox } from "@/components/animate-ui/base/checkbox";
import { Label } from "@/components/ui/label";

import type { ListData } from "@/routes/CurrentList";

import { updateIngredientBought } from "@/services/ingredient.services";
import type { IngredientInChecklist } from "@/types/ingredient.types";

type ChecklistItemProps = {
  item: IngredientInChecklist;
  currentListId: number;
  setList: React.Dispatch<React.SetStateAction<ListData | null>>;
};

export default function ChecklistItem({
  item,
  currentListId,
  setList,
}: ChecklistItemProps) {
  const handleToggle = async (ingredientId: number, currentBought: boolean) => {
    try {
      await updateIngredientBought(
        currentListId!,
        ingredientId,
        !currentBought
      );
      setList((prev) => {
        if (!prev) return prev;
        const newIngredients = prev.ingredients.map((ing) =>
          parseInt(ing.id) === ingredientId
            ? { ...ing, bought: currentBought ? !currentBought : false }
            : ing
        );
        return { ...prev, ingredients: newIngredients };
      });
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <div key={item.id} className="flex gap-4">
      <Checkbox
        id={`ing-${item.id}`}
        checked={item.bought}
        onCheckedChange={() => handleToggle(parseInt(item.id), item.bought)}
        className="bg-primary"
      />
      <Label htmlFor={`ing-${item.id}`} className="text-white font-paragraph">
        {item.name} - {item.quantity} {item.unit}
      </Label>
    </div>
  );
}
