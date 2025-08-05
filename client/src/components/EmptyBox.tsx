import emptyBox from "@/assets/illu/empty_box.png";

export default function EmptyBox() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="font-subtitle text-2xl text-white">
        Aucun ingrédient dans la liste
      </p>
      <img src={emptyBox} className="w-64 h-auto" />
    </div>
  );
}
