import React from "react";
import { HeaderContainer, ProfileDropdown } from "./index.styled";
import { Link } from "react-router-dom";
// import { AudioOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import { CgProfile } from "react-icons/cg";

function DashboardHeader() {
  const items = [
    {
      label: <Link to="/settings">Settings</Link>,
      key: "0",
    },
    {
      label: <Link to="/logout">Logout</Link>,
      key: "logout",
    },
  ];
  const { Search } = Input;
  // const suffix = (
  //   <AudioOutlined
  //     style={{
  //       fontSize: 16,
  //       color: "#1677ff",
  //     }}
  //   />
  // );
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
    <HeaderContainer>
      <Space
        direction="vertical"
        // style={{
        //   width: "100%",
        //   height: "70px",
        //   background: "white",
        //   padding: "0px 15px",
        //   boxShadow: "0 1px 1px 0 lightgray",
        //   color: "white",
        //   alignItems: "center",
          
        // }}
      >
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: "350px",
            marginTop: "5%",

          }}
        />
      </Space>
      <Dropdown trigger={["click"]} menu={{ items }}>
        <ProfileDropdown src={CgProfile} alt="profile" />
      </Dropdown>
      </HeaderContainer>
    </>
  );
}

export default DashboardHeader;
