import { useNavigate } from "react-router-dom";

const LogontButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-600"
    >
      Wyloguj się
    </button>
  );
};

export default LogontButton;
