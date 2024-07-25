import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Layout/Root";

import { PrivateRoute } from "../Pages/PrivateRoute/PrivateRoute";
import { LoginAndRegistration } from "../Pages/LoginAndRegistration/LoginAndRegistration";

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
    element: <LoginAndRegistration />,
  },
]);
