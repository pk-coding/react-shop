import { useParams } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";

const ProductDetailsPage = () => {
  const { id } = useParams();

  return <ProductDetails productId={id} />;
};

export default ProductDetailsPage;
