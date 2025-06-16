import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/recettes">Recettes</Link>
      <Link to="/liste">Liste</Link>
      <Link to="/recettes/ajouter">Ajouter Recette</Link>
    </nav>
  );
};
