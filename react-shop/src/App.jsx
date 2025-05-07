import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/Home";
import LoginPage from "./routes/Login";
import ProductPage from "./routes/Products";
import RegisterPage from "./routes/Register";
import ProductDetailsPage from "./routes/ProductsDetails";
import AddNewProductPage from "./routes/AddNewProduct";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import CartPageRoute from "./routes/CartPageRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Publiczne trasy */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Chronione trasy */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage />} />

        {/* Inne trasy dla zalogowanych użytkowników */}
        <Route
          path="products"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <PrivateRoute>
              <ProductDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="new"
          element={
            <PrivateRoute>
              <AddNewProductPage />
            </PrivateRoute>
          }
        />

        <Route
          path="cart"
          element={
            <PrivateRoute>
              <CartPageRoute />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
