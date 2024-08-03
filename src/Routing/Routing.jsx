import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "../Pages/PrivateRoute/PrivateRoute";
import { LoginAndRegistration } from "../Pages/LoginAndRegistration/LoginAndRegistration";
import { Home } from "../Pages/Home/Home";
import { SendMoney } from "../Pages/SendMoney/SendMoney";
import { CashIn } from "../Pages/CashIn/CashIn";
import { CashOut } from "../Pages/CashOut/CashOut";
import { AddMoney } from "../Pages/AddMoney/AddMoney";
import { MainRoot } from "../Layout/MainRoot";

export const Routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainRoot />
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
      {
        path: "/sendmoney",
        element: (
          <PrivateRoute>
            <SendMoney />
          </PrivateRoute>
        ),
      },
      {
        path: "/cashin",
        element: (
          <PrivateRoute>
            <CashIn />
          </PrivateRoute>
        ),
      },
      {
        path: "/cashout",
        element: (
          <PrivateRoute>
            <CashOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/addmoney",
        element: (
          <PrivateRoute>
            <AddMoney />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginAndRegistration />,
  },
]);
