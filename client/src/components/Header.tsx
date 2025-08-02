import { Link } from "react-router-dom";
import logo from "../assets/logos/logo_white.png";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex justify-left content-center gap-8 position-top pb-4">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-20  object-contain px-2 ml-4" />
      </Link>
      <div className="flex flex-col justify-center content-start">
        <h1 className="text-4xl font-title text-white text-left">{title}</h1>
      </div>
    </header>
  );
};
