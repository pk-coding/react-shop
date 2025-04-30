import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/Home";
import LoginPage from "./routes/Login";
import ProductPage from "./routes/Products";
import RegisterPage from "./routes/Register";
import ProductDetailsPage from "./routes/ProductsDetails";
import AddNewProductPage from "./routes/AddNewProduct";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
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
      </Route>
    </Routes>
  );
}

export default App;
