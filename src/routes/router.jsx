


import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchDonors from "../pages/SearchDonors";
import PublicRequests from "../pages/PublicRequests";
import RequestDetails from "../pages/RequestDetails";
import ErrorPage from "../pages/ErrorPage"; 

import DashboardHome from "../dashboard/DashboardHome";
import Profile from "../dashboard/Profile";
import MyRequests from "../dashboard/donor/MyRequests";
import CreateRequest from "../dashboard/donor/CreateRequest";
import AllUsers from "../dashboard/admin/AllUsers";
import AllRequests from "../dashboard/shared/AllRequests";
import Funding from "../dashboard/shared/Funding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },          
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "search", element: <SearchDonors /> },
      { path: "donation-requests", element: <PublicRequests /> },
      {
        path: "donation-requests/:id",
        element: (
          <PrivateRoute>
            <RequestDetails />
          </PrivateRoute>
        )
      }
    ]
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },   // "/dashboard"
      { path: "profile", element: <Profile /> },
      { path: "my-donation-requests", element: <MyRequests /> },
      { path: "create-donation-request", element: <CreateRequest /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "all-blood-donation-request", element: <AllRequests /> },
      { path: "funding", element: <Funding /> }
    ]
  },

  
  {
    path: "*",
    element: <ErrorPage />
  }
]);

export default router;