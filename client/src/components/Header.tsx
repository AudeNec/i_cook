type HeaderProps = {
  content: string;
};

export const Header = ({ content }: HeaderProps) => (
  <header className="flex flex-col justify-center content-center h-64 p-2">
    <h1 className="text-3xl font-title text-secondary text-center">
      {content}
    </h1>
  </header>
);
