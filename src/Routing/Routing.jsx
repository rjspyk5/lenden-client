import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Layout/Root";
import { PrivateRoute } from "../Pages/PrivateRoute/PrivateRoute";
import { LoginAndRegistration } from "../Pages/LoginAndRegistration/LoginAndRegistration";
import { Home } from "../Pages/Home/Home";

export const Routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginAndRegistration />,
  },
]);
