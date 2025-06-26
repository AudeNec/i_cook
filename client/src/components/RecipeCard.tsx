import { ChangeInListButton } from "./ChangeInListButton";
import { InfoButton } from "./InfoButton";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

type RecipeCardProps = {
  id: string;
  name: string;
};

export const RecipeCard = ({ id, name }: RecipeCardProps) => {
  return (
    <Card className="w-64 h-52 flex flex-col justify-between bg-primary">
      <CardHeader>
        <CardTitle className="text-center text-white font-paragraph">
          {name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <InfoButton id={id} />
        <ChangeInListButton id={id} />
      </CardFooter>
    </Card>
  );
};
