import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useProductDetails } from "../../hooks/useProductDetails";
import Loader from "../Loader";
import styles from "../../styles/ProductList.module.css";

const ProductDetails = ({ productId }) => {
  const buttonRef = useRef(null);
  const { data: product, error } = useProductDetails(productId);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

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
    return <Loader />;
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
