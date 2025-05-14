import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetch";
import { Product } from "../types/product";
import { ApiResponse } from "../types/api";
import { SortOption } from "../types/unions";

const useProducts = (
  sortState: SortOption,
  priceMin: number | undefined,
  priceMax: number | undefined,
  selectedCategory: string,
  searchTerm: string,
  debounceSearchTerm: string,
  setSortState: React.Dispatch<React.SetStateAction<SortOption>>,
  setPriceMin: React.Dispatch<React.SetStateAction<number | undefined>>,
  setPriceMax: React.Dispatch<React.SetStateAction<number | undefined>>,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { data, isLoading, error }: ApiResponse<Product[]> = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );

  const filteredAndSortedProducts: Product[] = useMemo(() => {
    if (!data) return [];

    const filteredList = data.filter((product) => {
      return (
        (product.price >= (priceMin || 0)) &&
        (product.price <= (priceMax || Infinity)) &&
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (!searchTerm ||
          product?.title?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            ?.includes(searchTerm.toLowerCase()))
      );
    });

    const listCopy = [...filteredList];

    switch (sortState) {
      case "price_asc":
        return listCopy.sort((a, b) => a.price - b.price);
      case "price_desc":
        return listCopy.sort((a, b) => b.price - a.price);
      default:
        return listCopy;
    }
  }, [data, sortState, priceMin, priceMax, selectedCategory, searchTerm]);

  const resetFilters = () => {
    setSortState("none");
    setPriceMin(undefined);
    setPriceMax(undefined);
    setSelectedCategory("all");
    setSearchTerm("");
  };

  return {
    data,
    isLoading,
    error,
    filteredAndSortedProducts,
    resetFilters,
  };
};

export default useProducts;
