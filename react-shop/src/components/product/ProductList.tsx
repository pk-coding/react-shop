import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loader from "../Loader";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import useDebounce from "../../hooks/useCategories";
import styles from "../../styles/ProductList.module.css";
import { Product } from "../../types/product";
import { SortOption } from "../../types/unions";

type LocationState = {
  fromLogin?: boolean;
};

const ProductList = () => {
  const [sortState, setSortState] = useState<SortOption>("none");
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<boolean>(true);
  const location = useLocation();
  const state = location.state as LocationState | null;
  const fromLogin = state?.fromLogin;
  const debounceSearchTerm = useDebounce<string>(searchTerm);
  const { data, isLoading, error, filteredAndSortedProducts, resetFilters } =
    useProducts(
      sortState,
      priceMin,
      priceMax,
      selectedCategory,
      searchTerm,
      debounceSearchTerm,
      setSortState,
      setPriceMin,
      setPriceMax,
      setSelectedCategory,
      setSearchTerm
    );
  const categoryOptions = useCategories(data);

  if (isLoading) return <Loader />;
  if (error) return <div>Failed to load</div>;

  const handleDismiss = () => {
    setConfirmMessage(false);
  };

  return (
    <div className={styles.container}>
      {fromLogin && confirmMessage && (
        <div className="flex items-center justify-between p-4 mb-4 bg-green-100 rounded-md shadow-md">
          <p className="text-green-600 text-lg font-semibold">
            Logowanie zakończone sukcesem.
          </p>
          <button
            onClick={handleDismiss}
            className="ml-4 px-2 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            OK
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1">Szukaj w tytule i opisie:</label>
          <input
            id="searchTerm"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Cena min:</label>
          <input
            id="minPrice"
            type="number"
            value={priceMin ?? ""}
            onChange={(e) =>
              setPriceMin(e.target.value ? Number(e.target.value) : undefined)
            }
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Cena max:</label>
          <input
            id="maxPrice"
            type="number"
            value={priceMax ?? ""}
            onChange={(e) =>
              setPriceMax(e.target.value ? Number(e.target.value) : undefined)
            }
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Szukaj po kategorii:</label>
          <select
            className="p-2 border rounded-md w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions?.map((category: string) => (
              <option key={category} value={category}>
                {category === "all" ? "Wszystkie kategorie" : category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Sortowanie:</label>
          <select
            className="p-2 border rounded-md w-full"
            value={sortState}
            onChange={(e) => setSortState(e.target.value as SortOption)}
          >
            <option value="none">Brak sortowania</option>
            <option value="price_asc">Cena rosnąco</option>
            <option value="price_desc">Cena malejąco</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="p-2 border rounded-md w-full hover:bg-gray-100 transition text-green-500 !text-green-500"
          >
            Wyczyść filtry
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
