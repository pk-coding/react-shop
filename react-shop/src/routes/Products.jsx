import { useLocation } from "react-router-dom";
import ProductList from "../components/product/ProductList";

const ProductPage = () => {
  const location = useLocation();
  const fromLogin = location.state?.fromLogin;
  console.log(fromLogin);

  return (
    <div className="flex flex-col">
      {fromLogin && (
        <p className="text-green-500 text-center">
          Logowanie zakończone sukcesem.
        </p>
      )}
      <ProductList />
    </div>
  );
};

export default ProductPage;
