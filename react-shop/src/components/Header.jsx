import { useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import LogoutButton from "../components/LogoutButton";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { cartSum } = useCart();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {user ? (
        <header className="header">
          <div className="w-1/2 flex justify-start items-center gap-4">
            <LogoutButton />
            <NavLink to="/" className="mr-4">
              Home
            </NavLink>
            <NavLink to="/products" className="mr-4">
              Produkty
            </NavLink>
            <NavLink to="/new">Dodaj Produkt</NavLink>
          </div>

          <div className="w-1/2 flex justify-end items-center gap-4">
            <NavLink to="/cart">
              <p className="text-pink-600">
                Wartość przedmiotów w koszyku: {cartSum}
              </p>
            </NavLink>
            <span className="font-bold text-xl">React Shop</span>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="w-1/2 flex justify-start items-center gap-4">
            <NavLink to="/" className="mr-4">
              Home
            </NavLink>
            {pathname !== "/login" && (
              <NavLink to="/login" className="mr-4">
                Logowanie
              </NavLink>
            )}
            {pathname !== "/register" && (
              <NavLink to="/register">Rejestracja</NavLink>
            )}
          </div>
          <div className="w-1/2 flex justify-end items-center gap-4">
            <span className="font-bold text-xl">React Shop</span>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </header>
      )}
    </>
  );
};
export default Header;
