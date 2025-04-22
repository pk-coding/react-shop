import React from "react";

const name = "Paweł K.";

const Header = ({ address = { address: "Brak adresu." } }) => {
  return (
    <div style={{ color: "blue" }}>
      <h1 className="text-red-200">Sklep internetowy</h1>
      <p>{address.city}</p>
    </div>
  );
};

export { name };
export default Header;
