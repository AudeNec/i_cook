import img from "@/assets/illu/home.png";

type ErrorPageProps = {
  error: string;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-10">
        Oups, une erreur est survenue
      </h1>
      <img src={img} alt="Error illustration" className="w-1/2 mx-auto mt-10" />
      <p className="text-center text-lg mt-5">{error}</p>
    </section>
  );
}
