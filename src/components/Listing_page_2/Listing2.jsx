import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/features/product/productSlice";
import Card from "../reuseable/Card";
import Loading from "../reuseable/Loading";
import ScrollToTopOnDataLoad from "../reuseable/ScrollToTopOnDataLoad";
import { fetchCategoriesName } from "../../Redux/features/category/categorySlice";

const Listing2 = () => {
  const dispatch = useDispatch();
  const {
    products,
    isLoading: isProductLoading,
    productCount,
    totalPages,
  } = useSelector((state) => state.product);
  const { categories, isLoading: isCategoryLoading } = useSelector(
    (state) => state.category
  );
  const [catId, setCatId] = useState("");
  const [page, setPage] = useState(1);
  console.log("Cat", catId);
  useEffect(() => {
    dispatch(getAllProducts({ page: page, limit: 6, cat: catId  }));
    dispatch(fetchCategoriesName());
  }, [page, catId]);

  return (
    <div>
      <ScrollToTopOnDataLoad isLoading={isCategoryLoading} />
      {isProductLoading && <Loading />}

      <div>
        {/* Filter */}
        <div>
          <select
            name="filter"
            id="filter"
            value={catId}
            onChange={(e) => setCatId(e.target.value)}  
          >
            <option value="">All Categories</option>
            {categories.length !== 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 max-w-[80%] mx-auto gap-5">
          {products.length !== 0 &&
            products.map((prod) => (
              <Card
                image={`${import.meta.env.VITE_API_BASE_URL}/${prod.image}`}
                title={prod.name}
                price={prod.price}
              />
            ))}
        </div>
        <div>
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-4 py-2 border rounded ${
                  page === index + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing2;
