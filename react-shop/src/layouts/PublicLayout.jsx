import { NavLink, Outlet, useLocation } from "react-router-dom";

const PublicLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="flex space-x-4">
          <NavLink to="/">Home</NavLink>
          {pathname === "/login" && (
            <NavLink to="/register">Rejestracja</NavLink>
          )}
          {pathname === "/register" && <NavLink to="/login">Logowanie</NavLink>}
        </div>
        <div className="text-xl font-bold">React Shop</div>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};
export default PublicLayout;
