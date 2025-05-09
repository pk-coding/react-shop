import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="text-red-600 rounded">
      Wyloguj się
    </button>
  );
};

export default LogoutButton;
