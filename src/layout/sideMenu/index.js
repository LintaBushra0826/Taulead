import React from "react";
import { Menu } from "antd";
import { SideMenuContainer } from "./index.styled";
import "./index.styled";
import { Link } from "react-router-dom";

const items = [
  {
    label: <Link to="/home">Home</Link>,
    name: "home",
    key: "home",
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
    label: "Statistics",
    name: "Statistics",
    key: "statistics",
    children: [
      {
        type: "Raw Material Stats",
        name: "Raw Material Stats",
        label: <Link to="/rawmaterialstats">Raw Material Stats</Link>,
      },
      {
        type: "Human Resource Stats",
        name: "Human Resource Stats",
        label: <Link to="/humanresourcestats">Human Resource Stats</Link>,
      },
    ],
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
  },
  {
    label: <Link to="/settings">Settings</Link>,
    name: "settings",
    key: "settings",
  },
  {
    label: <Link to="/colorPlatte">Color Platte</Link>,
    name: "colorplatte",
    key: "colorplatte",
  },
];

function SideMenu() {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <SideMenuContainer>
    <div className="menudiv">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["home"]}
        mode="inline"
        items={items}
      />
    </div>
  </SideMenuContainer>
  );
}

export default SideMenu;
