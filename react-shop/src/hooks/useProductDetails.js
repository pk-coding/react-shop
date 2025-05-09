import useSWR from "swr";
import { fetcher } from "../utils/fetch";

export const useProductDetails = (productId) => {
  const { data, isLoading, error } = useSWR(
    `https://fakestoreapi.com/products/${productId}`,
    fetcher
  );

  return { data, error, isLoading };
};
