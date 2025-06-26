import { Header } from "../components/Header";
import { HomeButton } from "../components/HomeButton";

export const Home = () => {
  return (
    <>
      <Header content="Hello Aude !" />
      <section className="flex flex-col justify-center content-center gap-4 mt-4">
        <HomeButton link="/recettes" title="Recettes" />
        <HomeButton link="/liste" title="Liste" />
        <HomeButton link="/recettes/ajouter" title="Ajouter une recette" />
      </section>
    </>
  );
};
