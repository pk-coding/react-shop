import "./App.css";
import Header, { name } from "./components/Header";
import ProductList from "./components/product/ProductList";

const mockAddress = {
  city: "Toruń",
};

function App() {
  return (
    <>
      <div>
        <p>{name}</p>
        <Header address={mockAddress} />
        <ProductList />
      </div>
    </>
  );
}

export default App;
