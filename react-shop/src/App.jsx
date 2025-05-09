import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./routes/Home";
import LoginPage from "./routes/Login";
import RegisterPage from "./routes/Register";
import ProductDetailsPage from "./routes/ProductsDetails";
import AddNewProductPage from "./routes/AddNewProduct";
import CartPage from "./routes/CartPage";

import PrivateRoute from "./routes/PrivateRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";

import Loader from "./components/Loader";
import "./App.css";

const Products = lazy(() => import("./routes/Products"));

function App() {
  return (
    <Routes>
      {/* Public routes – dla wszystkich */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes – tylko dla zalogowanych */}
      <Route
        element={
          <PrivateRoute>
            <ProtectedLayout />
          </PrivateRoute>
        }
      >
        <Route
          path="products"
          element={
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          }
        />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="new" element={<AddNewProductPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
