import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/pages/product_details_page/ProductDetails";
import Layout from "./components/Layout/Site/SiteLayout";
import Landing from "./components/pages/landing_page/Landing";
import Listing from "./components/pages/listing_page/Listing";
import Signup from "./components/pages/auth/Signup";
import Login from "./components/pages/auth/Login";
import AdminProtectedRoute from "./components/routes/AdminProtectedRoute";
import VerifyResetOtp from "./components/pages/auth/VerityResetOtp";
import VerifyEmail from "./components/pages/auth/VerifyEmail";
import HandleResetOrVerifyOtp from "./components/pages/auth/HandleResetOrVerifyOtp";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./components/Layout/Admin/AdminLayout";
import Categories from "./components/pages/admin/Categories";
import Users from "./components/pages/admin/Users";
import Products from "./components/pages/admin/Products";
import Listing2 from "./components/Listing_page_2/Listing2";
import ManageAccount from "./components/pages/manage-account/ManageAccount";

function App() {
  const router = createBrowserRouter([
    // Public routes (everyone can access)
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "/listing_page", element: <Listing /> },
        { path: "/listing2_page", element: <Listing2 /> },
        { path: "/product_details", element: <ProductDetails /> },
        { path: "/manage-account", element: <ManageAccount /> }, // now also public
      ],
    },

    // Admin routes
    {
      element: <AdminProtectedRoute />,
      children: [
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { path: "users", element: <Users /> },
            { path: "categories", element: <Categories /> },
            { path: "products", element: <Products /> },
          ],
        },
      ],
    },

    // Auth routes
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/send-otp", element: <HandleResetOrVerifyOtp /> },
    { path: "/verify-reset-otp", element: <VerifyResetOtp /> },
    { path: "/verify-email", element: <VerifyEmail /> },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
