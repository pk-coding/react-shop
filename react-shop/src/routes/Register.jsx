import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RegisterForm from "../components/Forms/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
