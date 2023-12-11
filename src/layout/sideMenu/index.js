import React from "react";
import { Divider, Menu } from "antd";
import { LogoutDiv, MenuDiv, SideMenuContainer } from "./index.styled";
import "./index.styled";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo white.png";
import { Logo, LogoContainer, Span } from "./index.styled";
import { PiHouse } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { TbRulerMeasure } from "react-icons/tb";
import { VscServerProcess } from "react-icons/vsc";
import { ImStatsBars } from "react-icons/im";
import { MdTableRows } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FcProcess } from "react-icons/fc";
import { MdOutlinePriceChange } from "react-icons/md";
import { HiBars3 } from "react-icons/hi2";
import { ImFileText2 } from "react-icons/im";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

const items = [
  {
    label: (
      <Link to="/home">
        <PiHouse />
        {"  "}
        Home
      </Link>
    ),
    name: "home",
    key: "home",
  },
  {
    label: (
      <Link to="/dashboard">
        <MdOutlineDashboard />
        {"  "}Dashboard
      </Link>
    ),
    key: "dashboard",
  },
  {
    label: (
      <div>
        <MdOutlineInventory2 />
        {"  "}
        Inventory
      </div>
    ),
    name: "Inventory",
    key: "inventory",
    children: [
      {
        type: "Raw Material Inventory",
        name: "Raw Material Inventory",
        label: (
          <Link to="/RawMaterial">
            <MdOutlineInventory2 />
            {"  "}
            Raw Material Inventory
          </Link>
        ),
      },
      {
        type: "Human Resource Inventory",
        name: "Human Resource Inventory",
        label: (
          <Link to="/HumanResource">
            <IoPersonOutline />
            {"  "}Human Resource Inventory
          </Link>
        ),
      },
    ],
  },
  {
    label: (
      <div>
        <TbRulerMeasure />
        {"  "}Measuring Unit
      </div>
    ),
    name: "Measuring Units",
    key: "measuringUnits",
    children: [
      {
        type: "Create Units",
        name: "Create Units",
        label: (
          <Link to="/MeasuringUnit">
            <IoCreateOutline />
            {"  "}Create Unit
          </Link>
        ),
      },
      {
        type: "View Units",
        name: "View Units",
        label: (
          <Link to="/viewmeasuringunits">
            <HiBars3 />
            {"  "}View Unit
          </Link>
        ),
      },
    ],
  },
  {
    label: (
      <div>
        <VscServerProcess />
        {"  "}Processes
      </div>
    ),
    name: "Processes",
    key: "processes",
    children: [
      {
        type: "Definition",
        name: "Definition",
        label: (
          <Link to="/process">
            <IoCreateOutline />
            {"  "}Definition
          </Link>
        ),
      },
      {
        type: "Execution",
        name: "Execution",
        label: (
          <Link to="/execution">
            <FcProcess />
            {"  "}Execution
          </Link>
        ),
      },
    ],
  },
  {
    label: (
      <Link to="/statisticspage">
        <ImStatsBars />
        {"  "}Statistics
      </Link>
    ),
    key: "statistics",
  },
  {
    label: (
      <div>
        <ImFileText2 />
        {"  "}Logs
      </div>
    ),
    name: "Logs",
    key: "logs",
    children: [
      {
        type: "Process Logs",
        name: "Process Logs",
        label: (
          <Link to="/viewprocesslogs">
            <VscServerProcess />
            {"  "}Process Logs
          </Link>
        ),
      },
      {
        type: "Price Logs",
        name: "Price Logs",
        label: (
          <Link to="/viewpricelogs">
            <MdOutlinePriceChange />
            {"  "}Price Logs
          </Link>
        ),
      },
    ],
  },
  {
    label: (
      <Link to="/profile">
        <LiaUserEditSolid />
        {"  "}Profile
      </Link>
    ),
    name: "profile",
    key: "profile",
  },
];

const logout = [
  {
    label: (
      <Link to="/login">
        <CiLogout />
        {"  "}Logout
      </Link>
    ),
    name: "logout",
    key: "logout",
  },
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
        <Menu style={{ width: 256 }} mode="inline" items={items} />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="menudiv">
        <Menu style={{ width: 256 }} mode="inline" items={logout} />
      </div>
      <br />

      <MenuDiv>
        © 2023 Copyright Tau_Lead
        <br />
        All rights reserved
      </MenuDiv>
    </SideMenuContainer>
  );
}

export default SideMenu;
