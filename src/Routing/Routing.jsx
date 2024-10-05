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
import { AgentPrivateRoute } from "./../Pages/PrivateRoutes/AgentPrivateRoute/AgentPrivateRoute";
import { AllTransiction } from "../Pages/Dashboard/Admin/AllTransiction";
import { AllUser } from "../Pages/Dashboard/Admin/AllUser";
import { WithdrawReqeust } from "../Pages/Dashboard/Admin/WithdrawReqeust";
import { DepositMoneyReq } from "../Pages/Dashboard/Admin/DepositMoneyReq";
import { ErrorElement } from "../Components/ErrorElement/ErrorElement";
import { NotFound } from "../Components/NotFound/NotFound";
import { Payment } from "../Pages/Payment/Payment";
import { Loan } from "../Pages/Loan/Loan";
import { AgentHome } from "../Pages/Dashboard/AgentDashboard/AgentHome";
import { AdminHome } from "../Pages/Dashboard/Admin/AdminHome";
import { MarchentWithdraw } from "../Pages/Dashboard/Marchent/MarchentWithdraw";

export const Routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserPrivateRoute>
        <MainRoot />
      </UserPrivateRoute>
    ),

    // errorElement: <ErrorElement />,
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
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/loan",
        element: <Loan />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginAndRegistration />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  // Agent Dashboard Routing
  {
    path: "agent",
    element: (
      <AgentPrivateRoute>
        <DashboardLayout />
      </AgentPrivateRoute>
    ),
    children: [
      { path: "", element: <AgentHome /> },
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
    children: [
      { path: "", element: <AdminHome /> },
      {
        path: "history",
        element: <AllTransiction />,
      },
      {
        path: "users",
        element: <AllUser />,
      },
      {
        path: "withdrawreq",
        element: <WithdrawReqeust />,
      },
      {
        path: "depositreq",
        element: <DepositMoneyReq />,
      },
    ],
  },
  {
    path: "/marchent",
    element: <DashboardLayout />,
    children: [
      {
        path: "withdrawreq",
        element: <MarchentWithdraw />,
      },
    ],
  },
]);
