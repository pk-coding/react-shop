import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";

const yupSchema = yup.object().shape({
  username: yup.string().required("Pole username jest wymagane"),
  password: yup.string().required("Pole hasło jest wymagane"),
});

export default function LoginForm() {
  const [apiError, setApiError] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(yupSchema) });

  const onSubmit = async (data) => {
    setApiError(null);
    setIsFormSubmitting(true);

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        data
      );

      if (response.data.token) {
        const fakeUser = { username: data.username };
        login(response.data.token, fakeUser);
        reset();
        navigate("/products", { state: { fromLogin: true } });
      }
    } catch {
      setApiError("Dane logowania są niepoprawne");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mt-10 mx-auto border p-4 max-w-md"
    >
      <h1 className="text-xl font-bold text-center">Logowanie</h1>

      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          autoFocus
          {...register("username")}
          className={`p-2 rounded border ${
            errors.username ? "border-red-500" : "border-gray-500"
          }`}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`p-2 rounded border ${
            errors.password ? "border-red-500" : "border-gray-500"
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {apiError && (
        <p className="text-red-500 text-center font-semibold">{apiError}</p>
      )}

      <button
        type="submit"
        className="btn btn-primary block mx-auto"
        disabled={isSubmitting || isFormSubmitting}
      >
        Zaloguj się
      </button>
    </form>
  );
}
