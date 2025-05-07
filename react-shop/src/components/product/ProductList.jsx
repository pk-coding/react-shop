import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import styles from "../../styles/ProductList.module.css";
import useSWR from "swr";
import { fetcher } from "../../utils/fetch";

const ProductList = () => {
  const { data, isLoading, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <div className={styles.container}>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
