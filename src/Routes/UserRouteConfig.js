import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/User/Home/HomePage";
import SignUp from "../Pages/User/Signup/UserSignUp";
import UserProfile from "../Pages/User/UserProfile/UserProfilePage";
import DriverSignup from "../Pages/Driver/Signup/SignupPage.js";
import CompleteProfilePage from "../Pages/Driver/CompleteProfile/CompleteProfilePage.js";
import DriverLoginPage from "../Pages/Driver/Login/DriverLoginPage.jsx";
import DriverProfilePage from "../Pages/Driver/Profile/DriverProfilePage.jsx";


function RouteConfig() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>,
    },
    {
      path: "/login",
      element: <SignUp/>,
    },
    {
      path:'/userProfile',
      element: 
        <UserProfile/>
    },
    {
      path:'/driver',
      children:[
        {
          path:'signup',
          element:<DriverSignup/>
        },
        {
          path:'complete-profile',
          element:<CompleteProfilePage/>
        },
        {
          path:'login',
          element:<DriverLoginPage/>,
        },
        {
          path:'profile',
          element:<DriverProfilePage/>
        }
      ]
    }
    
  ]);
  return <RouterProvider router={router} />;
}

export default RouteConfig;
