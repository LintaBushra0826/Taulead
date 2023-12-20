import React from "react";
import {
  HeaderContainer,
  ProfileDropdown,
  NavBarWrapper,
  AvatarWrapper,
} from "./index.styled";
import { Link } from "react-router-dom";
// import { AudioOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Dropdown, Input, Space } from "antd";
import { CgProfile } from "react-icons/cg";
import { FormHeading } from "../../styles/global.styled";
import { DownOutlined, UserOutlined, SettingFilled } from "@ant-design/icons";
import { SlSettings } from "react-icons/sl";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

function DashboardHeader() {
  const items = [
    {
      label: (
        <Link
          to="/profile"
          style={{
            color: "#360a5a",
          }}
        >
          <LiaUserEditSolid
            style={{
              color: "#360a5a",
            }}
          />
          {"  "}Profile
        </Link>
      ),
      key: "profile",
    },
    {
      label: (
        <Link
          to="/login"
          style={{
            color: "#360a5a",
          }}
        >
          <CiLogout
            style={{
              color: "#360a5a",
            }}
          />
          {"  "}Logout
        </Link>
      ),
      key: "logout",
    },
  ];
  const handleMenuClick = (e) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <NavBarWrapper>
        {/* <BusinessLogo>{BusinessLogo}</BusinessLogo> */}
        <FormHeading>Business Name</FormHeading>
        <AvatarWrapper>
          <IoIosNotifications
            style={{
              color: "#360a5a",
              height: "20px",
              width: "30px",
            }}
          />
          {"   "}
          <Avatar
            style={{
              backgroundColor: "#360a5a",
            }}
            icon={<UserOutlined />}
          />{" "}
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space
                style={{
                  color: "#360a5a",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    color: "#360a5a",
                    fontWeight: "bold",
                  }}
                >
                  Username
                </span>
                <DownOutlined
                  style={{
                    color: "#360a5a",
                    width: "20px",
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </AvatarWrapper>
      </NavBarWrapper>
    </>
  );
}

export default DashboardHeader;
