import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogontButton from "../components/LogontButton";

const name = "Paweł K.";
const address = { address: "Toruń" };

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="flex items-center p-4 bg-gray-200">
        <div className="w-1/2 flex justify-start">
          {isAuthenticated ? (
            <>
              <NavLink to="/" className="mr-4">
                Home
              </NavLink>
              <NavLink to="/products" className="mr-4">
                Produkty
              </NavLink>
              <NavLink to="/new">Dodaj Produkt</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="mr-4">
                Home
              </NavLink>
              <NavLink to="/login" className="mr-4">
                Logowanie
              </NavLink>
              <NavLink to="/register">Rejestracja</NavLink>
            </>
          )}
        </div>

        <div className="w-1/2 flex justify-end">
          <span className="font-bold text-xl">React Shop</span>
        </div>
      </header>

      {isAuthenticated ? <LogontButton /> : ""}

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="flex items-center justify-between p-4 bg-gray-200">
        <div className="w-1/2 text-center">
          <p>{name}</p>
        </div>
        <div className="w-1/2 text-center">
          <p>{address.address}</p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
