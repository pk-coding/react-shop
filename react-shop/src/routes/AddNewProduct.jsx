import { useLocation } from "react-router-dom";
import AddNewProductForm from "../components/forms/AddNewProductForm";

const AddNewProductPage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <AddNewProductForm />
    </div>
  );
};
export default AddNewProductPage;
