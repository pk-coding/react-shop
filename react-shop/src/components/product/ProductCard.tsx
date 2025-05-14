import { Link } from "react-router-dom";
import { useRef } from "react";
import useCart from "../../hooks/useCart";
import { Product } from "../../types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const isProductInCart = cartItems.some(
    (item: Product) => item.id === product.id
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isProductInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  return (
    <div className="flex w-full p-2.5 items-center">
      <img
        src={product.image}
        alt="Obraz produktu"
        className="w-[10%] max-w-[50px] h-auto p-2.5 object-contain"
      />

      <Link
        to={`/product/${product.id}`}
        title="Kliknij aby zobaczyć opis"
        className="w-[50%] p-2.5"
      >
        {product.title}
      </Link>

      <p className="w-[15%] p-2.5 text-center">{product.price.toFixed(2)} zł</p>

      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`w-[25%] p-2.5 text-green transition-colors duration-200 
          focus:outline-none focus:ring-0 focus:border-none
          ${isProductInCart
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {isProductInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
      </button>
    </div>
  );
};

export default ProductCard;
