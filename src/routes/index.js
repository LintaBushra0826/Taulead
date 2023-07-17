import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from 'react-router-dom';
import Profile from "../pages/profile";
import Login from "../pages/login";
import Signup from "../pages/signup";
import RawMaterial from "../pages/rawMaterial";
import HumanResource from "../pages/humanresource";
import MeasuringUnit from '../pages/measuringunit';
import ViewRawMaterial from '../pages/viewrawmaterial';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <Link to="/Profile"> <button>Profile</button></Link>
    <Link to="/Login"> <button>Login</button></Link>
    </>
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Signup",
    element: <Signup />
  },
  {
    path: "/RawMaterial",
    element: <RawMaterial />
  },
  {
    path: "/HumanResource",
    element: <HumanResource />
  },
  {
    path: "/MeasuringUnit",
    element: <MeasuringUnit />
  },
  {
    path: "/ViewRawMaterial",
    element: <ViewRawMaterial />
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
