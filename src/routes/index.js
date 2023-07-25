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
import ViewMeasuringUnit from "../pages/viewmeasuringunits";
import Home from "../pages/home";
import ViewProcessLogs from "../pages/processlogs";
import ViewPriceLogs from "../pages/pricelogs";
import ViewHumanResource from "../pages/viewhumanresource";
import RawMaterialStats from "../pages/rawmaterialstats";
import HumanResourceStats from "../pages/humanresourcestats";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
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
  {
    path: "/viewhumanresource",
    element: <ViewHumanResource />,
  },
  {
    path: "/viewmeasuringunits",
    element: <ViewMeasuringUnit />,
  },
  {
    path: "/viewprocesslogs",
    element: <ViewProcessLogs />,
  },
  {
    path: "/viewpricelogs",
    element: <ViewPriceLogs />,
  },
  {
    path: "/process",
    element: <Process />,
  },
  {
    path: "/rawmaterialstats",
    element: <RawMaterialStats />,
  },
  {
    path: "/humanresourcestats",
    element: <HumanResourceStats />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
