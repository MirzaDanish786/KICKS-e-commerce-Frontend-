import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/pages/product_details_page/ProductDetails";
import Layout from "./components/Layout/Layout";
import Landing from "./components/pages/landing_page/Landing";
import Listing from "./components/pages/listing_page/Listing";
import Signup from "./components/pages/auth/Signup";
import Login from "./components/pages/auth/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import VerifyResetOtp from "./components/pages/auth/VerityResetOtp";
import VerifyEmail from "./components/pages/auth/VerifyEmail";
import HandleResetOrVerifyOtp from "./components/pages/auth/HandleResetOrVerifyOtp";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "/", element: <Landing /> },
            { path: "/listing_page", element: <Listing /> },
            { path: "/product_details", element: <ProductDetails /> },
          ],
        },
      ],
    },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/send-otp", element: <HandleResetOrVerifyOtp /> },
    { path: "/verify-reset-otp", element: <VerifyResetOtp /> },
    { path: "/verify-email", element: <VerifyEmail /> },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
