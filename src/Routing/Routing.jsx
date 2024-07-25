import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Layout/Root";
import { Login } from "../Pages/Login/Login";
import { PrivateRoute } from "../Pages/PrivateRoute/PrivateRoute";

export const Routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
