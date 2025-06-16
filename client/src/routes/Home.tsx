import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <header>
        <h1>Hello Aude !</h1>
      </header>
      <section>
        <Link to="/recettes">Recettes</Link>
        <Link to="/liste">Liste</Link>
        <Link to="/recettes/ajouter">Ajouter Recette</Link>
      </section>
    </>
  );
};
