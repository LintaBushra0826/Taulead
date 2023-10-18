import React from "react";
import { Menu } from "antd";
import { SideMenuContainer } from "./index.styled";
import "./index.styled";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo white.png";
import {
  Logo,
  LogoContainer,
} from "./index.styled";


const items = [
  {
    label: <Link to="/home">Home</Link>,
    name: "home",
    key: "home",
  },
  {
    label: <Link to="/dashboard">Dashboard</Link>,
    key: "dashboard",
  },
  {
    label: "Inventory",
    name: "Inventory",
    key: "inventory",
    children: [
      {
        type: "Raw Material Inventory",
        name: "Raw Material Inventory",
        label: <Link to="/RawMaterial">Raw Material Inventory</Link>,
      },
      {
        type: "Human Resource Inventory",
        name: "Human Resource Inventory",
        label: <Link to="/HumanResource">Human Resource Inventory</Link>,
      },
    ],
  },
  {
    label: "Measuring Units",
    name: "Measuring Units",
    key: "measuringUnits",
    children: [
      {
        type: "Create Units",
        name: "Create Units",
        label: <Link to="/MeasuringUnit">Create Units</Link>,
      },
      {
        type: "View Units",
        name: "View Units",
        label: <Link to="/viewmeasuringunits">View Units</Link>,
      },
    ],
  },
  {
    label: "Processes",
    name: "Processes",
    key: "processes",
    children: [
      {
        type: "View Processes",
        name: "View Processes",
        label: <Link to="/process">View Processes</Link>,
      },
    ],
  },
  {
    label: <Link to="/statisticspage">Statistics</Link>,
    key: "statistics",
  },
  {
    label: "Logs",
    name: "Logs",
    key: "logs",
    children: [
      {
        type: "Process Logs",
        name: "Process Logs",
        label: <Link to="/viewprocesslogs">Process Logs</Link>,
      },
      {
        type: "Price Logs",
        name: "Price Logs",
        label: <Link to="/viewpricelogs">Price Logs</Link>,
      },
    ],
  },
  {
    label: <Link to="/profile">Profile</Link>,
    name: "profile",
    key: "profile",
  }
];

function SideMenu() {
  // const onClick = (e) => {
  //   console.log("click ", e);
  // };

  return (
    <SideMenuContainer>
      <LogoContainer>
        <Logo src={logo} alt="logo" className="logo" />
      </LogoContainer>
    <div className="menudiv">
      <Menu
        style={{ width: 256 }}
        mode="inline"
        items={items}
      />
    </div>
  </SideMenuContainer>
  );
}

export default SideMenu;