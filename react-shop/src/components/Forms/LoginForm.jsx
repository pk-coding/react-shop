import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const yupSchema = yup.object().shape({
  username: yup.string().required("Pole username jest wymagane"),
  password: yup.string().required("Pole hasło jest wymagane"),
});

export default function LoginForm() {
  const [apiError, setApiError] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const navigate = useNavigate();

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
        localStorage.setItem("AuthToken", response.data.token);
        reset();
        navigate("/products", { state: { fromLogin: true } });
      }
      setIsFormSubmitting(false);
    } catch (e) {
      setApiError("Dane logowania są niepoprawne");
      setIsFormSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mt-10 mx-auto border p-4"
    >
      <h1>Logowanie</h1>
      <div className="flex flex-col">
        <label>Username</label>
        <input
          autoFocus
          {...register("username", { required: "Username jest wymagany" })}
          className={
            errors.username
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Hasło</label>
        <input
          type="password"
          {...register("password", { required: "Hasło jest wymagane." })}
          className={
            errors.password
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      {apiError && <p className="font-bold text-red-500">{apiError}</p>}

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
