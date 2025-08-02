import { ChangeInListButton } from "./ChangeInListButton";
import { InfoButton } from "./InfoButton";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

type RecipeCardProps = {
  id: string;
  name: string;
};

export const RecipeCard = ({ id, name }: RecipeCardProps) => {
  return (
    <>
      <article className="flex items-center justify-start text-white border-y-secondary border-y-1 px-4 py-8 gap-4 hover:bg-secondary transition-colors duration-300 relative">
        <ChangeInListButton id={id} />
        <h3 className="text-lg font-bold mb-2 text-center">{name}</h3>
        <InfoButton id={id} />
      </article>
    </>
  );
};
