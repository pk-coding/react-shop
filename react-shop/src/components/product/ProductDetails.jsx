import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProductList.module.css";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!res.ok) {
          throw new Error(`Nie znaleziono produktu (kod: ${res.status})`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return (
      <div className={styles.detailsDiv}>
        <button onClick={() => navigate(-1)} className="mb-4">
          ← Wstecz
        </button>
        <p style={{ color: "red" }}>Błąd: {error}</p>
      </div>
    );
  }

  if (!product) {
    return <div className={styles.detailsDiv}>Ładowanie produktu...</div>;
  }

  return (
    <div className={styles.detailsDiv}>
      <button onClick={() => navigate(-1)} className="mb-4">
        ← Wstecz
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <strong>Produkt:</strong>
        <img
          src={product.image}
          alt="Obraz produktu"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      {product.title}
      <strong>Opis:</strong>
      {product.description}
    </div>
  );
};

export default ProductDetails;
