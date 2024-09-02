import { createBrowserRouter } from "react-router-dom";
import { LoginAndRegistration } from "../Pages/LoginAndRegistration/LoginAndRegistration";
import { Home } from "../Pages/Home/Home";
import { SendMoney } from "../Pages/SendMoney/SendMoney";
import { CashIn } from "../Pages/CashIn/CashIn";
import { CashOut } from "../Pages/CashOut/CashOut";
import { AddMoney } from "../Pages/AddMoney/AddMoney";
import { MainRoot } from "../Layout/MainRoot";
import { UserPrivateRoute } from "../Pages/PrivateRoutes/UserPrivateRoute/UserPrivateRoute";
import { AgentAddMoney } from "../Pages/Dashboard/AgentDashboard/AgentAddMoney";
import { CashInReq } from "../Pages/Dashboard/AgentDashboard/CashInReq";
import { WithdrawMoney } from "../Pages/Dashboard/AgentDashboard/WithdrawMoney";

import { DashboardLayout } from "../Layout/DashboardLayout";
import { AgentTransictionHistory } from "../Pages/Dashboard/AgentDashboard/AgentTransictionHistory";

import { TransictionHistory } from "../Pages/TransictionHistory/TransictionHistory";

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
      {
        path: "/history",
        element: <TransictionHistory />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginAndRegistration />,
  },

  // Agent Dashboard Routing
  {
    path: "agent",
    element: <DashboardLayout />,
    children: [
      {
        path: "addmoney",
        element: <AgentAddMoney />,
      },
      {
        path: "cashinreq",
        element: <CashInReq />,
      },
      {
        path: "withdrawmoney",
        element: <WithdrawMoney />,
      },

      {
        path: "history",
        element: <AgentTransictionHistory />,
      },
    ],
  },
  // Admin related dashboard
  {
    path: "admin",
    element: <DashboardLayout />,
  },
]);
