import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Schema yup
const yupSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Pole tytuł wymaga minimum 3 znaki")
    .max(25, "Pole tytuł może mieć maksymalnie 25 znaków")
    .required("Wpisz tytuł produktu"),
  price: yup
    .number()
    .nullable()
    .min(0, "Cena musi być większa lub równa 0")
    .max(9999, "Cena nie może przekroczyć 9999")
    .required("Podaj cenę produktu"),
  description: yup
    .string()
    .min(10, "Pole opis wymaga minimum 10 znaków")
    .max(50, "Pole opis może mieć maksymalnie 50 znaków")
    .required("Podaj opis"),
  category: yup
    .string()
    .notOneOf([""], "Wybierz kategorię")
    .required("Wybierz kategorię"),
  image: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .url("Podaj poprawny URL obrazu")
    .nullable(),
});

export default function AddNewProductForm() {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // eact-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(yupSchema), mode: "onChange" });

  const imageUrl = watch("image");

  const [isHovered, setIsHovered] = useState(false);

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccess(null);
    setIsFormSubmitting(true);
    console.log("Dane formularza", data);
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        data
      );
      if (response) {
        setSuccess(true);
        reset();
      }
      setIsFormSubmitting(false);
      console.log(response);
    } catch (e) {
      if (e.status === 401) {
        setApiError("Dane dotyczące produktu są niepoprawne");
      } else {
        setApiError(
          "Wystąpił nieznany błąd podczas wysyłania damnych. Prosimy o kontakt z pomocą techniczną"
        );
      }
      setIsFormSubmitting(false);
      console.log(e);
    }
  };

  // Functions to handle hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onMouseLeave={handleMouseLeave}
      className="space-y-4 mt-10 w-1/2 mx-auto border p-4"
    >
      <h1>Dodaj nowy produkt</h1>

      {/* Title field */}
      <div className="flex flex-col">
        <label>Tytuł</label>
        <input
          autoFocus
          {...register("title")}
          className={
            errors.title
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      {/* Price field */}
      <div className="flex flex-col">
        <label>Cena</label>
        <input
          {...register("price", {
            setValueAs: (value) =>
              value === "" ? undefined : parseFloat(value),
          })}
          type="number"
          step="0.01"
          className={
            errors.price
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </div>

      {/* Description field */}
      <div className="flex flex-col">
        <label>Opis</label>
        <input
          {...register("description")}
          className={
            errors.description
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>

      {/* Category field */}
      <div className="flex flex-col">
        <label>Kategoria</label>
        <select
          {...register("category")}
          defaultValue=""
          className={
            errors.category
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        >
          <option value="" disabled hidden>
            -- Wybierz kategorię --
          </option>
          <option value="clothesShooes">Odzież/Obuwie</option>
          <option value="food">Żywność</option>
          <option value="cosmetics">Higiena/Kosmetyki</option>
          <option value="electronics">Elektronika</option>
          <option value="remaining">Pozostałe</option>
        </select>
        {errors.category?.message && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </div>

      {/* Image field */}
      <div className="flex flex-col">
        <label>Obraz (opcjonlanie)</label>
        <input
          {...register("image")}
          type="text"
          onMouseEnter={handleMouseEnter}
          placeholder="Wprowadź URL obrazu"
          className={
            errors.image
              ? "border border-red-500 p-2 rounded"
              : "border border-gray-500 p-2 rounded"
          }
        />
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}

        {/* Hoover */}
        {isHovered && imageUrl && (
          <div className="mt-2 w-1/2 mx-auto p-2 relative h-0 pb-[50%]">
            <img
              src={imageUrl}
              alt="Podgląd"
              className="object-cover absolute inset-0 w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Displaying fetching error */}
      {apiError && <p className="font-bold text-red-500">{apiError}</p>}
      {success && (
        <p className="font-bold text-green-500">
          Sukces. Dane zostały wysłane.
        </p>
      )}

      {/* Button submiting form */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting || isFormSubmitting}
      >
        Dodaj Produkt
      </button>
    </form>
  );
}
