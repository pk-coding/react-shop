import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import LogontButton from "../components/LogontButton";
import { ThemeContext } from "../context/ThemeContext";

const name = "Paweł K.";
const address = { address: "Toruń" };

const ProtectedLayout = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <header className="header">
        <div className="w-1/2 flex justify-start">
          {user ? (
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

        <div className="w-1/2 flex justify-end items-center gap-4">
          <span className="font-bold text-xl">React Shop</span>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙 Ciemny motyw" : "☀️ Jasny motyw"}
          </button>
        </div>
      </header>

      {user ? <LogontButton /> : ""}

      {user && cartItems.length > 0 && (
        <div>
          <NavLink to="/cart">
            <p className="text-green-600 font-semibold p-4">
              Produktów w koszyku: {cartItems.length}{" "}
              <strong>[Sprawdź szczegóły]</strong>
            </p>
          </NavLink>
        </div>
      )}

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
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

export default ProtectedLayout;
