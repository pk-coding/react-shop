import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogontButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-red-600 px-4 py-2 rounded"
    >
      Wyloguj się
    </button>
  );
};

export default LogontButton;
