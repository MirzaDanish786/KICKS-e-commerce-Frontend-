import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
} from "../../../Redux/features/product/productSlice";
import { fetchCategoriesName } from "../../../Redux/features/category/categorySlice";
import ProductForm from "./ProductForm";
import Loading from "../../reuseable/Loading";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    isLoading,
    isError,
  } = useSelector((state) => state.product || {});
  const { categories = [] } = useSelector((state) => state.category || {});
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

useEffect(() => {
  const fetch = async () => {
    try {
      await dispatch(getAllProducts({page:1, limit: 100, cat: ''})).unwrap();
      await dispatch(fetchCategoriesName()).unwrap();
    } catch (err) {
      toast.error("Failed to fetch data!");
    }
  };
  fetch();
}, [dispatch]);


  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        dispatch(deleteProduct(id)).unwrap();
        toast.success("Product Successfully deleted!");
      } catch (error) {
        toast.error(error?.message || error || "Something went wrong!");
      }
    }
  };

  return (
    <div className="m-6 p-6 bg-white rounded shadow mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          onClick={() => {
            setEditProduct(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
      {showForm && (
        <ProductForm
          categories={categories}
          existingProduct={editProduct}
          onClose={() => setShowForm(false)}
        />
      )}
      {isError && <p className="text-red-500">Something went wrong!</p>}
      {isLoading && <Loading />}
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Description</th>
            <th className="px-2 py-1">Price</th>
            <th className="px-2 py-1">Category Id</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No products.
              </td>
            </tr>
          )}
          {products.map((prod) => (
            <tr key={prod._id} className="border-t">
              <td className="px-2 py-1">{prod.name}</td>
              <td className="px-2 py-1">{prod.description}</td>
              <td className="px-2 py-1">{prod.price}</td>
              <td className="px-2 py-1">
                {prod.category?.name || prod.category || "N/A"}
              </td>
              <td className="px-2 py-1">
                <button
                  onClick={() => {
                    setEditProduct(prod);
                    setShowForm(true);
                  }}
                  className="mr-2 px-3 py-1 cursor-pointer bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="px-3 py-1 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
