import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";

const ProductPage = () => {
  const location = useLocation();
  const fromLogin = location.state?.fromLogin;

  const [showMessage, setShowMessage] = useState(!!fromLogin);

  useEffect(() => {
    if (fromLogin) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [fromLogin]);

  return (
    <div className="relative flex flex-col">
      {showMessage && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity">
          <p className="text-green-600 text-2xl font-semibold">
            Logowanie zakończone sukcesem.
          </p>
        </div>
      )}

      <div className={`${showMessage ? "blur-sm pointer-events-none" : ""}`}>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
