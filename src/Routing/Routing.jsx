import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Layout/Root";

export const Routing = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);
