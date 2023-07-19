import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Signup from "../pages/signup";
import RawMaterial from "../pages/rawMaterial";
import HumanResource from "../pages/humanresource";
import MeasuringUnit from "../pages/measuringunit";
import ViewRawMaterial from "../pages/viewrawmaterial";
import Process from "../pages/process";
import PrivateRoute from "./private";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/RawMaterial",
    element: (
      <PrivateRoute>
        <RawMaterial />
      </PrivateRoute>
    ),
  },
  {
    path: "/HumanResource",
    element: (
      <PrivateRoute>
        <HumanResource />
      </PrivateRoute>
    ),
  },
  {
    path: "/MeasuringUnit",
    element: <MeasuringUnit />,
  },
  {
    path: "/ViewRawMaterial",
    element: <ViewRawMaterial />,
  },
  // {
  //   path: "/CreateProcess",
  //   element: <CreateProcess />,
  // },
  {
    path: "/ProcessChart",
    element: <Process />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
