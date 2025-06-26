import { Outlet, useLocation } from "react-router-dom";

import { Nav } from "./components/Nav";
import { ToastContainer } from "react-toastify";
import { ListProvider } from "./context/ListContext";

function App() {
  const location = useLocation();
  const hideNavBar = location.pathname === "/";

  return (
    <body className="bg-primary-dark">
      <ListProvider>
        <ToastContainer className="toast-position" stacked autoClose={3000} />
        <main className="mx-64 flex flex-col justify-stretch content-center h-screen">
          <Outlet />
        </main>
        {!hideNavBar && <Nav />}
      </ListProvider>
    </body>
  );
}

export default App;
