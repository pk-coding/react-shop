import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetch";

const useProducts = (
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
) => {
  const { data, isLoading, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );

  const filteredAndSortedProducts = useMemo(() => {
    if (!data) return [];

    const filteredList = data.filter((product) => {
      return (
        (product.price >= priceMin || !priceMin) &&
        (product.price <= priceMax || !priceMax) &&
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
    setPriceMin(null);
    setPriceMax(null);
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
