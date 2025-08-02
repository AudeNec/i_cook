import { Header } from "@/components/Header";
import { HomeButton } from "@/components/HomeButton";

import homeImg from "@/assets/illu/home.png";

export const Home = () => {
  return (
    <>
      <Header title="Hello Aude!" />
      <section className="flex flex-col justify-center content-center items-center h-full gap-10">
        <h3 className="text-xl text-white font-text text-center opacity-60">
          Bienvenue sur ton application de gestion de recettes et de liste de
          courses
        </h3>
        <img src={homeImg} alt="Home" className="w-full object-cover" />
        <section className="flex flex-col justify-center content-center gap-4 mt-4">
          <HomeButton link="/liste" title="Retrouve ta liste de courses" />
          <HomeButton link="/recettes" title="Découvre tes recettes" />
        </section>
      </section>
    </>
  );
};
