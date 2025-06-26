import { Link } from "react-router-dom";

type HomeButtonProps = {
  link: string;
  title: string;
};

export const HomeButton = ({ link, title }: HomeButtonProps) => {
  return (
    <button className="bg-secondary-dark rounded-lg p-4">
      <Link
        to={link}
        className="text-center text-white text-2xl font-subtitle w-full h-full inline-block"
      >
        {title}
      </Link>
    </button>
  );
};
