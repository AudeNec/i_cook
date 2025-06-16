import { Outlet, useLocation } from "react-router-dom";

import "./App.css";
import { Nav } from "./components/Nav";
import { ToastContainer } from "react-toastify";
import { ListProvider } from "./context/ListContext";

function App() {
  const location = useLocation();
  const hideNavBar = location.pathname === "/";

  return (
    <>
      <ListProvider>
        <main>
          <ToastContainer className="toast-position" stacked autoClose={3000} />
          <Outlet />
        </main>
        {!hideNavBar && <Nav />}
      </ListProvider>
    </>
  );
}

export default App;
