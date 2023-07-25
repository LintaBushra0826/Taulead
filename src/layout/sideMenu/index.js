import React from "react";
import { Menu } from "antd";
import { SideMenuContainer } from "./index.styled";
import { Link } from "react-router-dom";

const items = [
  {
    label: <Link to="/home">Home</Link>,
    key: "home",
  },
  {
    label: "Inventory",
    key: "Inventory",
    children: [
      {
        type: "Raw Material Inventory",
        label: <Link to="/RawMaterial">Raw Material Inventory</Link>,
      },
      {
        type: "Human Resource Inventory",
        label: <Link to="/HumanResource">Human Resource Inventory</Link>,
      },
    ],
  },
  {
    label: "Measuring Units",
    key: "Measuring Units",
    children: [
      {
        type: "Create Units",
        label: <Link to="/MeasuringUnit">Create Units</Link>,
      },
      {
        type: "View Units",
        label: <Link to="/viewmeasuringunits">View Units</Link>,
      },
    ],
  },
  {
    label: "Processes",
    key: "Processes",
    children: [
      {
        type: "View Processes",
        label: <Link to="/process">View Processes</Link>,
      },
      // {
      //   type: 'Create Processes',
      //   label: <Link to="/CreateProcess">Create  Processes</Link>,
      // },
    ],
  },
  {
    label: "Statistics",
    key: "Statistics",
    children: [
      {
        type: "Raw Material Stats",
        label: <Link to="/rawmaterialstats">Raw Material Stats</Link>,
      },
      {
        type: "Human Resource Stats",
        label: <Link to="/humanresourcestats">Human Resource Stats</Link>,
      },
    ],
  },
  {
    label: "Logs",
    key: "Logs",
    children: [
      {
        type: "Process Logs",
        label: <Link to="/viewprocesslogs">Process Logs</Link>,
      },
      {
        type: "Price Logs",
        label: <Link to="/viewpricelogs">Price Logs</Link>,
      },
    ],
  },
  {
    label: <Link to="/profile">Profile</Link>,
    key: "profile",
    // disabled: true,
  },
  {
    label: <Link to="/settings">Settings</Link>,
    key: "Settings",
    // disabled: true,
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
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
    </SideMenuContainer>
  );
}

export default SideMenu;
