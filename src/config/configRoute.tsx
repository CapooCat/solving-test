import { createBrowserRouter } from "react-router-dom";
import { ROUTE } from "../constant/route";
import AppLayout from "../components/layout/AppLayout";
import PageProblemOne from "@/pages/problem-1";
import PageProblemTwo from "@/pages/problem-2";
import PageProblemThree from "@/pages/problem-3";

// Create the router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <></>,
    children: [
      {
        path: "/",
        element: <PageProblemOne />,
      },
      {
        path: ROUTE.PROBLEM_1.route,
        element: <PageProblemOne />,
      },
      {
        path: ROUTE.PROBLEM_2.route,
        element: <PageProblemTwo />,
      },
      {
        path: ROUTE.PROBLEM_3.route,
        element: <PageProblemThree />,
      },
    ],
  },
]);
