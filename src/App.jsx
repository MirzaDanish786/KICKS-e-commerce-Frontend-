import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/pages/product_details_page/ProductDetails";
import Layout from "./components/Layout/Layout";
import Landing from "./components/pages/landing_page/Landing";
import Listing from "./components/pages/listing_page/Listing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        { path: "/", element: <Landing /> },
        { path: "/listing_page", element: <Listing /> },
        { path: "/product_details", element: <ProductDetails /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
