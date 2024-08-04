import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/User/Home/HomePage";
import SignUp from "../Pages/User/Signup/UserSignUp";
import UserProfile from "../Pages/User/UserProfile/UserProfilePage";
import DriverSignup from "../Pages/Driver/Signup/SignupPage.js";
import CompleteProfilePage from "../Pages/Driver/CompleteProfile/CompleteProfilePage.jsx";
import DriverLoginPage from "../Pages/Driver/Login/DriverLoginPage.jsx";
import DriverProfilePage from "../Pages/Driver/Profile/DriverProfilePage.jsx";
import AdminDashBoard from "../Pages/Admin/AdminDashBoard.jsx";
import DriverList from "../Pages/Admin/DriverList.jsx";
import DriverDetailsPage from "../Pages/Admin/DriverDetailsPage.jsx";
import AdminLogin from "../Pages/Admin/AdminLogin.jsx";
import DriverMainPage from "../Pages/Driver/DriverMainPage/DriverMainPage.jsx";
import AdminProtected from "./AdminProtected.jsx";
import DriverProtected from "./DriverProtected.js";
import Approval from "../Pages/Driver/ApprovalUI/Approval.jsx";
import UsersList from "../Pages/Admin/UsersList.jsx";
import UserProtected from "./UserProtected.js";

function RouteConfig() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <SignUp />,
    },
    {
      path: "/userProfile/:userId",
      element: (
        <UserProtected>
          <UserProfile />
        </UserProtected>
      ),
    },
    {
      path: "/driver",
      children: [
        {
          path: "signup",
          element: <DriverSignup />,
        },
        {
          path: "complete-profile",
          element: <CompleteProfilePage />,
        },
        {
          path: "login",
          element: <DriverLoginPage />,
        },
        {
          path: "profile",
          element: (
            <DriverProtected>
              <DriverProfilePage />
            </DriverProtected>
          ),
        },
        {
          path: "home",
          element: (
            <DriverProtected>
              <DriverMainPage />
            </DriverProtected>
          ),
        },
        {
          path: "approval",
          element: <Approval />,
        },
      ],
    },
    {
      path: "/admin",
      children: [
        {
          path: "login",
          element: <AdminLogin />,
        },
        {
          path: "home",
          element: (
            <AdminProtected>
              <AdminDashBoard />
            </AdminProtected>
          ),
        },
        {
          path: "driver-list",
          element: (
            <AdminProtected>
              <DriverList />
            </AdminProtected>
          ),
        },
        {
          path: "viewDriver-Detail/:driverId",
          element: (
            <AdminProtected>
              <DriverDetailsPage />
            </AdminProtected>
          ),
        },
        {
          path: "Users-list",
          element: (
            <AdminProtected>
              <UsersList />
            </AdminProtected>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default RouteConfig;
