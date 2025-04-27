import "./App.css";
import Header, { name } from "./components/Header";
import ProductList from "./components/product/ProductList";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import AddNewProductForm from "./components/Forms/AddNewProductForm";

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
        <LoginForm />
        <RegisterForm />
        <AddNewProductForm />
      </div>
    </>
  );
}

export default App;
