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
import { AgentAddMoney } from "../Pages/Dashboard/AgentDashboard/AgentAddMoney";
import { CashInReq } from "../Pages/Dashboard/AgentDashboard/CashInReq";
import { WithdrawMoney } from "../Pages/Dashboard/AgentDashboard/WithdrawMoney";
import { CashOutReq } from "../Pages/Dashboard/AgentDashboard/CashOutReq";

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

  // Agent Dashboard Routing
  {
    path: "agent",
    element: <AgentDashboard />,
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
        path: "cashoutreq",
        element: <CashOutReq />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminDashboard />,
  },
]);
