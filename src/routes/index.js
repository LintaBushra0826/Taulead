import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Signup from "../pages/signup";
import RawMaterial from "../pages/rawMaterial";
import HumanResource from "../pages/humanresource";
import MeasuringUnit from "../pages/measuringunit";
import ViewRawMaterial from "../pages/viewrawmaterial";
import CreateProcess from "../pages/createprocess";
import ProcessChart from "../pages/process/components/processchart";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/RawMaterial",
    element: <RawMaterial />,
  },
  {
    path: "/HumanResource",
    element: <HumanResource />,
  },
  {
    path: "/MeasuringUnit",
    element: <MeasuringUnit />,
  },
  {
    path: "/ViewRawMaterial",
    element: <ViewRawMaterial />,
  },
  {
    path: "/CreateProcess",
    element: <CreateProcess />,
  },
  {
    path: "/ProcessChart",
    element: <ProcessChart />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
