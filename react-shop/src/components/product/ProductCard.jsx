import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="flex w-full p-2.5">
      <img
        src={product.image}
        alt="Obraz produktu"
        style={{ width: "50px", height: "50px" }}
        className="flex w-[20%] p-2.5"
      />
      <Link
        to={`/product/${product.id}`}
        title="Kliknij aby zobaczyć opis"
        className="flex w-[70%] justify-start items-start cursor-pointer p-2.5"
      >
        {product.title}
      </Link>
      <p className="flex w-[10%] justify-center items-center p-2.5">
        {product.price.toFixed(2)}zł
      </p>
    </div>
  );
};

export default ProductCard;
