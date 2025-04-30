import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const yupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Pole username jest wymagane")
    .min(5, "Pole username wymaga minimum 5 znaków")
    .max(15, "Pole username może mieć maksymalnie 15 znaków"),
  email: yup
    .string()
    .required("Pole email jest wymagane")
    .email("Niepoprawny format adresu email"),
  password: yup
    .string()
    .required("Pole hasło jest wymagane")
    .min(12, "Pole hasło wymaga minimum 12 znaków")
    .max(25, "Pole hasło może mieć maksymalnie 25 znaków")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Hasło musi zawierać jedną dużą literę, jedną małą literę i jedną cyfrę"
    ),
  confirmPassword: yup
    .string()
    .required("Pole hasło jest wymagane")
    .oneOf([yup.ref("password")], "Hasła muszą być identyczne"),
});

export default function RegisterForm() {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(yupSchema) });

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccess(null);
    setIsFormSubmitting(true);

    try {
      const response = await axios.post("https://fakestoreapi.com/users", data);
      if (response) {
        setSuccess(true);
        reset();
        navigate("/login", { state: { fromRegister: true } });
      }
      setIsFormSubmitting(false);
    } catch (e) {
      setApiError("Wystąpił błąd podczas rejestracji");
      setIsFormSubmitting(false);
    }
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mx-auto border p-4"
    >
      <h1>Rejestracja</h1>

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
        <label>Email</label>
        <input
          autoFocus
          {...register("email", { required: "Email jest wymagany" })}
          className={
            errors.email
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Hasło</label>
        <input
          type="password"
          {...register("password", {
            required: "Hasło jest wymagane.",
            minLength: {
              value: 12,
              message: "Hasło musi mieć co najmniej 12 znaków.",
            },
          })}
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

      <div className="flex flex-col">
        <label>Potwierdź hasło</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Potwierdzenie hasła jest wymagane.",
            validate: (value) =>
              value === password || "Hasła muszą być identyczne",
          })}
          className={
            errors.confirmPassword
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      {apiError && <p className="font-bold text-red-500">{apiError}</p>}

      <button
        type="submit"
        className="btn btn-primary block mx-auto"
        disabled={isSubmitting || isFormSubmitting}
      >
        Zarejestruj się
      </button>
    </form>
  );
}
