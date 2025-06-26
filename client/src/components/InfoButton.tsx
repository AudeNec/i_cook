import { BadgeInfo } from "lucide-react";
import { Link } from "react-router-dom";

type InfoButtonProps = {
  id: string;
};

export const InfoButton = ({ id }: InfoButtonProps) => (
  <Link
    to={`/recettes/${id}`}
    className="rounded-full hover:text-white cursor-pointer transition-colors duration-300 flex justify-center content-center"
  >
    <BadgeInfo className="w-6 h-6" color="var(--color-primary-dark)" />
  </Link>
);
