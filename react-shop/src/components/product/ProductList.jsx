import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import styles from "../../styles/ProductList.module.css";
import useSWR from "swr";
import { fetcher } from "../../utils/fetch";

const ProductList = () => {
  // const [products, setproducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, isLoading, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((data) => {setproducts(data) setLo});
  // }, []);

  return (
    <div className={styles.container}>
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => setSelectedProduct(product)}
        />
      ))}
      <ProductDetails selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductList;
