import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="fixed bottom-0 w-full h-20 flex justify-around items-center bg-primary text-white">
      <Link className="font-subtitle" to="/">
        Home
      </Link>
      <Link className="font-subtitle" to="/recettes">
        Recettes
      </Link>
      <Link className="font-subtitle" to="/liste">
        Liste
      </Link>
      <Link className="font-subtitle" to="/recettes/ajouter">
        Ajouter Recette
      </Link>
    </nav>
  );
};
