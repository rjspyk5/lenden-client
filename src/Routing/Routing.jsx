import { createBrowserRouter } from "react-router-dom";
import { LoginAndRegistration } from "../Pages/LoginAndRegistration/LoginAndRegistration";
import { Home } from "../Pages/Home/Home";
import { SendMoney } from "../Pages/SendMoney/SendMoney";
import { CashIn } from "../Pages/CashIn/CashIn";
import { CashOut } from "../Pages/CashOut/CashOut";
import { AddMoney } from "../Pages/AddMoney/AddMoney";
import { MainRoot } from "../Layout/MainRoot";
import { UserPrivateRoute } from "../Pages/PrivateRoutes/UserPrivateRoute/UserPrivateRoute";
import { AgentDashboard } from "../Pages/Dashboard/AgentDashboard/AgentDashboard";
import { AdminDashboard } from "../Pages/Dashboard/AdminDashboard/AdminDashboard";

export const Routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserPrivateRoute>
        <MainRoot />
      </UserPrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <UserPrivateRoute>
            <Home />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/sendmoney",
        element: (
          <UserPrivateRoute>
            <SendMoney />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/cashin",
        element: (
          <UserPrivateRoute>
            <CashIn />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/cashout",
        element: (
          <UserPrivateRoute>
            <CashOut />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/addmoney",
        element: (
          <UserPrivateRoute>
            <AddMoney />
          </UserPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginAndRegistration />,
  },
  {
    path: "agent",
    element: <AgentDashboard />,
  },
  {
    path: "admin",
    element: <AdminDashboard />,
  },
]);
