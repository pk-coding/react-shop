import { useEffect, useState } from "react";

const useCategories = (products) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!products) return;

    const uniqueCategories = [];

    for (const product of products) {
      if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    }

    setCategories(["all", ...uniqueCategories]);
  }, [products]);

  return categories;
};
export default useCategories;
