import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import ErrorPage from "./error-page";
import Orders from "./orders";

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
        path: "/orders",
        errorElement: <ErrorPage />,
        element: <Orders />,
      },
    ],
  },
]);

export default router;
