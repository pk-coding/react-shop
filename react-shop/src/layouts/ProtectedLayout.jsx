import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default ProtectedLayout;
