import useSWR from "swr";
import { fetcher } from "../utils/fetch";
import { ApiResponse } from "../types/api";
import { Product } from "../types/product";

export const useProductDetails = (productId: number) => {
  const { data, isLoading, error }: ApiResponse<Product> = useSWR(
    `https://fakestoreapi.com/products/${productId}`,
    fetcher
  );

  return { data, error, isLoading };
};
