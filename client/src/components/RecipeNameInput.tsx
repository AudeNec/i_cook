import { Input } from "@/components/ui/input";

interface RecipeNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipeNameInput({
  value,
  onChange,
}: RecipeNameInputProps) {
  return (
    <Input
      type="text"
      placeholder="Nom de la recette"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xl text-center font-subtitle mb-4 h-24 border-none"
    />
  );
}
