import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

type ListContextType = {
  currentListId: string | null;
};

const ListContext = createContext<ListContextType | null>(null);

export function ListProvider({ children }: { children: ReactNode }) {
  const [currentListId, setCurrentListId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrCreateList = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/lists/current`
        );

        if (response.ok) {
          const { id } = await response.json();
          setCurrentListId(id);
          return;
        }

        if (response.status === 404) {
          const createResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/lists`,
            {
              method: "POST",
            }
          );

          if (!createResponse.ok) {
            throw new Error("Failed to create new list");
          }

          const newListId = await createResponse.json();
          setCurrentListId(newListId);
        } else {
          throw new Error("Unexpected error when fetching list");
        }
      } catch (error) {
        toast.error("Error during list fetch/create:" + error);
      }
    };

    fetchOrCreateList();
  }, []);

  return (
    <ListContext.Provider value={{ currentListId }}>
      {children}
    </ListContext.Provider>
  );
}

export const useCurrentList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useCurrentList must be used within a UserProvider");
  }
  return context;
};
