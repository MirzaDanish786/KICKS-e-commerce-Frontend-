import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesName,
  addCategory,
  updateCategory,
  deleteCategory,
  resetStatus,
} from "../../../Redux/features/category/categorySlice";
import toast from "react-hot-toast";
import Loading from "../../reuseable/Loading";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError, isSuccess, errorMessage } =
    useSelector((state) => state.category);

  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const inputRef = useRef(null);


  useEffect(() => {
    dispatch(fetchCategoriesName());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
      dispatch(resetStatus());
    }
    if (isError) {
      toast.error(errorMessage || "Something went wrong");
      dispatch(resetStatus());
    }
  }, [isSuccess, isError, errorMessage, dispatch]);

  useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
    inputRef.current.select(); 
  }
}, [editingId]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    dispatch(addCategory(newCategory));
    setNewCategory("");
  };

  const handleUpdateCategory = (catId) => {
    if (!updatedName.trim()) return;
    dispatch(updateCategory({ catId, updatedName }));
    setEditingId(null);
    setUpdatedName("");
  };

  // Open dialog instead of window.confirm
  const handleDeleteCategory = (catId) => {
    setCategoryToDelete(catId);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleDialogConfirm = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete));
    }
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Add New Category */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          className="border px-3 py-2 rounded w-[300px]"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Categories Table */}
      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Category Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat._id || index}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {editingId === cat._id ? (
                      <input
                      ref={inputRef}
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="border-2 rounded-sm p-1"
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center ">
                    {editingId === cat._id ? (
                      <button
                        onClick={() => handleUpdateCategory(cat._id)}
                        className="bg-green-600 text-white rounded-sm cursor-pointer px-2 py-1"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(cat._id);
                          setUpdatedName(cat.name);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-sm cursor-pointer"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="bg-red-600 text-white px-2 py-1  cursor-pointer rounded-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No categories found.
                </td>
              </tr>
            )}

            {categories.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* MUI Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this category? The related Products will also deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;