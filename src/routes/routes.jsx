import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Overview from "../pages/Overview";
import Popular from "../pages/Popular";
import Ibnsina from "../pages/Ibnsina";
import Login from "../pages/Login";
import PrivateRoute from "./privateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "/overview",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "/due-sample",
        element: (
          <PrivateRoute>
            <Popular />
          </PrivateRoute>
        ),
      },
      {
        path: "/phlebotomist",
        element: (
          <PrivateRoute>
            <Ibnsina />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
