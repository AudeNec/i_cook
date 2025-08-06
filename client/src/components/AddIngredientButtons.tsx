import { Button } from "@/components/ui/button";

type AddIngredientButtonsProps = {
  addIngredient: (options: { isNew: boolean }) => void;
};

export default function AddIngredientButtons({
  addIngredient,
}: AddIngredientButtonsProps) {
  return (
    <div className="flex gap-2 px-4">
      <Button
        type="button"
        onClick={() => addIngredient({ isNew: false })}
        variant="secondary"
        className="flex-1"
      >
        Ajouter ingrédient existant
      </Button>
      <Button
        type="button"
        onClick={() => addIngredient({ isNew: true })}
        variant="secondary"
        className="flex-1"
      >
        Nouvel ingrédient
      </Button>
    </div>
  );
}
