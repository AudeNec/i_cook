import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="fixed bottom-0 w-full h-20 flex justify-around items-center bg-primary-dark text-white">
      <Link className="font-subtitle w-1/3 text-center" to="/recettes">
        Recettes
      </Link>
      <Link className="font-subtitle w-1/3 text-center" to="/liste">
        Liste
      </Link>
      <Link
        className="font-subtitle w-1/3 text-center p-4"
        to="/recettes/nouvellerecette"
      >
        Nouvelle Recette
      </Link>
    </nav>
  );
};
