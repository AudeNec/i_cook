import { useState } from "react";

export const Add = () => {
  const [name, setName] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", name);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de la recette"
      />
      <input type="submit" value="Enregistrer la recette" />
    </form>
  );
};
