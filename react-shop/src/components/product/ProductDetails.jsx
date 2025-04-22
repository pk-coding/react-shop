import styles from "../../styles/ProductList.module.css";

const ProductDetails = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return (
      <div className={styles.detailsDiv}>
        Kliknij tytuł produktu aby wyświetlić jego opis.
      </div>
    );
  }
  return (
    <div className={styles.detailsDiv}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <strong>Produkt:</strong>
        <img
          src={selectedProduct.image}
          alt="Obraz produktu"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      {selectedProduct.title}
      <br />
      <strong>Opis:</strong>
      <br />
      {selectedProduct.description}
    </div>
  );
};

export default ProductDetails;
