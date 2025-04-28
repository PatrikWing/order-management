import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import ErrorPage from "./error-page";
import Orders from "./orders";
import { OrderForm } from "./order-form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/orders" replace />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/orders",
    element: <Layout />,
    children: [
      {
        path: "",
        errorElement: <ErrorPage />,
        element: <Orders />,
      },
      {
        path: "new",
        element: <OrderForm />,
      },
      {
        path: ":orderId/edit",
        element: <OrderForm />,
      },
    ],
  },
]);

export default router;
