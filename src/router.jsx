import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Sell from "./pages/Sell";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/checkoutPage";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorBoundary></ErrorBoundary>,
    children: [
      {
        index:true,
        element: <Products></Products>
      },
      {
        path: '/products',
        element: <Products></Products>
      },
      {
        path: "/login",
        element: <Auth></Auth>,
      },
      {
        path: "/sell",
        element: (
          <ProtectedRoute>
             <Sell></Sell>
          </ProtectedRoute>)
      },
      {
        path:'/cart',
        element: (
          <ProtectedRoute>
              <CartPage></CartPage>
          </ProtectedRoute>)
      },
      {
        path:'/checkout',
        element: (
          <ProtectedRoute>
             <CheckoutPage></CheckoutPage>
          </ProtectedRoute>)
      }
    ],
  },
]);

export default router;
