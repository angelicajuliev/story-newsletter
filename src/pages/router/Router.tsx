import { FunctionComponent } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "@pages/ErrorPage/ErrorPage";
import BasePage from "./BasePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    errorElement: <ErrorPage />,
  },
]);

const Router: FunctionComponent = () => {
  return <RouterProvider router={router} />;
}

export default Router;
