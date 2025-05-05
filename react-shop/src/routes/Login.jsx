import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/Forms/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromRegister = location.state?.fromRegister;
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col">
      {fromRegister && (
        <p className="text-green-500 text-center">
          Rejestracja udana! Możesz się teraz zalogować.
        </p>
      )}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
