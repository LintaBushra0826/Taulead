import React from "react";
import LogoHome from "../../assets/images/LogoHome.png";
import profile from "../../assets/images/profile.png";
import {
  HeaderContainer,
  Heading,
  Logo,
  LogoContainer,
  ProfileDropdown,
} from "./index.styled";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";

function Header() {
  const items = [
    {
      label: <Link to="/settings"></Link>,
      key: "0",
    },
    {
      label: <Link to="/logout"></Link>,
      key: "logout",
    },
  ];

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={LogoHome} alt="logo" className="logo" />
        <Heading className="HeaderHeading">
          Manufacturing Resource Pipeline
        </Heading>
      </LogoContainer>
      <Dropdown trigger={["click"]} menu={{ items }}>
        <ProfileDropdown src={profile} alt="profile" />
      </Dropdown>
    </HeaderContainer>
  );
}

export default Header;
