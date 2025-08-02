import { Outlet, useLocation } from "react-router-dom";

import { Nav } from "./components/Nav";
import { ToastContainer } from "react-toastify";
import { ListProvider } from "./context/ListContext";

function App() {
  const location = useLocation();
  const hideNavBar = location.pathname === "/";

  return (
    <>
      <ListProvider>
        <ToastContainer className="toast-position" stacked autoClose={3000} />
        <main className="flex flex-col justify-stretch content-center h-screen overflow-scroll p-4">
          <Outlet />
        </main>
        {!hideNavBar && <Nav />}
      </ListProvider>
    </>
  );
}

export default App;
