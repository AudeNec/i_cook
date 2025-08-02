import { Info } from "lucide-react";
import { Link } from "react-router-dom";

type InfoButtonProps = {
  id: string;
};

export const InfoButton = ({ id }: InfoButtonProps) => (
  <Link
    to={`/recettes/${id}`}
    className="rounded-full hover:text-white cursor-pointer transition-colors duration-300 flex justify-center content-center absolute top-2 right-2"
  >
    <Info className="w-6 h-6" color="var(--color-secondary)" />
  </Link>
);
