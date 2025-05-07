import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProductList.module.css";
import useCart from "../../hooks/useCart";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const buttonRef = useRef(null);

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

  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isProductInCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  return (
    <div className={styles.detailsDiv}>
      <div className="mb-4">
        <button
          className="w-[50%] p-2.5 text-green transition-colors duration-200 focus:outline-none"
          onClick={() => navigate(-1)}
        >
          ← Wstecz
        </button>
        <button
          ref={buttonRef}
          onClick={handleClick}
          className={`w-[50%] p-2.5 text-green transition-colors duration-200 focus:outline-none ${
            isProductInCart
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isProductInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <strong>Produkt:</strong>
        <img
          src={product.image}
          alt="Obraz produktu"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <p>{product.title}</p>
      <strong>Opis:</strong>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
