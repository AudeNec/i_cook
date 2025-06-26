import type { ListData } from "@/routes/CurrentList";
import { updateIngredientBought } from "@/services/updateIngredientBought";
import type { IngredientWithQuantity } from "@/types/ingredient.types";
import { toast } from "react-toastify";
import { Checkbox } from "./animate-ui/base/checkbox";
import { Label } from "@/components/ui/label";

type ChecklistItemProps = {
  item: IngredientWithQuantity;
  currentListId: number;
  setList: React.Dispatch<React.SetStateAction<ListData | null>>;
};

export const ChecklistItem = ({
  item,
  currentListId,
  setList,
}: ChecklistItemProps) => {
  const handleToggle = async (ingredientId: number, currentBought: boolean) => {
    console.log(
      "Toggling ingredient:",
      ingredientId,
      "Current bought state:",
      currentBought
    );
    try {
      await updateIngredientBought(
        currentListId!,
        ingredientId,
        !currentBought
      );
      setList((prev) => {
        if (!prev) return prev;
        const newIngredients = prev.ingredients.map((ing) =>
          ing.id === ingredientId ? { ...ing, bought: !currentBought } : ing
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
        onCheckedChange={() => handleToggle(item.id, item.bought)}
        className="bg-primary"
      />
      <Label htmlFor={`ing-${item.id}`} className="text-white font-paragraph">
        {item.name} - {item.quantity} {item.unit}
      </Label>
    </div>
  );
};
