import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetch";
import useCart from "../hooks/useCart";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
  } = useSWR("https://fakestoreapi.com/products", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  const getProductDetails = (id) => {
    return products?.find((product) => product.id === id);
  };

  // Obliczanie całkowitej wartości koszyka
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <div className="cart-page p-4">
      <h1 className="text-green-500 text-xl font-semibold mb-4">Twój Koszyk</h1>

      <div className="w-full flex justify-end items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Kontynuuj zakupy
        </button>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-600 hover:underline text-sm"
          >
            Wyczyść koszyk
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="text-pink-600 text-lg font-semibold">
          Twój koszyk jest pusty.
        </p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => {
            const productDetails = getProductDetails(item.id);

            return (
              <li
                key={item.id}
                className="border p-4 rounded flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex flex-col w-[50%] p-2.5">
                  <Link
                    to={`/product/${item.id}`}
                    title="Kliknij aby zobaczyć opis"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                  {productDetails && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {productDetails.description}
                    </p>
                  )}
                </div>
                <span className="w-24 text-right">
                  {item.price.toFixed(2)} zł
                </span>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 hover:bg-red-600 text-green-600 px-3 py-1 rounded text-sm"
                >
                  Usuń
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="p-6 flex justify-end items-center text-green-600 text-2xl font-semibold gap-4">
          <span>Łączna wartość:</span>
          <span>{totalPrice.toFixed(2)} zł</span>
        </div>
      )}
    </div>
  );
};

export default CartPage;
