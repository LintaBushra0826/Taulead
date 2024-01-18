import React, { useEffect, useState } from "react";
import { NavBarWrapper, AvatarWrapper } from "./index.styled";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Space } from "antd";
import { FormHeading } from "../../styles/global.styled";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios";

function DashboardHeader() {
  const API_BASE_URL = "http://localhost:3005";
  const [userData, setUserData] = useState({
    Name: "",
    Business: "",
    Status: "",
  });
  useEffect(() => {
    fetchUserDataFromServer();
  }, []);

  const fetchUserDataFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing or undefined");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/userdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userDataFromServer = response.data;

      setUserData({
        Business: userDataFromServer.BusinessName,
        Name: userDataFromServer.Name,
        Status: userDataFromServer.Status,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

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
  return (
    <>
      <NavBarWrapper>
        {/* <BusinessLogo>{BusinessLogo}</BusinessLogo> */}
        <FormHeading>{capitalizeFirstLetter(userData.Business)}</FormHeading>
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
            <a href="/profile">
              <Space
                style={{
                  color: "#360a5a",
                  fontSize: "12px",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    color: "#360a5a",
                    fontWeight: "bold",
                  }}
                >
                  {userData.Name}{" "}
                </div>
                <DownOutlined
                  style={{
                    color: "#360a5a",
                    width: "15px",
                  }}
                />
              </Space>

              <div
                style={{
                  color: "#360a5a",
                  fontSize: "10px",
                  textAlign: "right",
                  marginLeft: "70px",
                  marginTop: "-10px",
                  width: "0px",
                  height: "15px",
                }}
              >
                {userData.Status}{" "}
              </div>
            </a>
          </Dropdown>
        </AvatarWrapper>
      </NavBarWrapper>
    </>
  );
}

export default DashboardHeader;
