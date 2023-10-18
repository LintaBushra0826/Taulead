import React from "react";
import logo from "../../assets/images/Logo white.png";
// import profile from "../../assets/images/profile.png";
import {
  HeaderContainer,
  Logo,
  LogoContainer,
  HeadMenu,
  ButtonContainer,
  // ProfileDropdown,
  HeadButton,
} from "./index.styled";
import {
  //Dropdown,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function Header() {
  //   const items = [
  //     {
  //       label: <Link to="/settings">Settings</Link>,
  //       key: "0",
  //     },
  //     {
  //       label: <Link to="/logout">Logout</Link>,
  //       key: "logout",
  //     },
  //   ];

  const ToService = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  const ToContactUs = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  const items = [
    {
      label: <Link to="/home">Home</Link>,
      key: "home",
    },
    {
      label: "About Us",
      key: (
        <a href="#contactUsform" onClick={ToContactUs}>
          Services
        </a>
      ),
    },
    {
      label: (
        <a href="#services-card" onClick={ToService}>
          Services
        </a>
      ),
      key: "Services",
    },
    {
      label: "Contact Us",
      key: (
        <a href="#contactUsform" onClick={ToContactUs}>
          Services
        </a>
      ),
    },
  ];

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={logo} alt="logo" className="logo" />
      </LogoContainer>
      <HeadMenu>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="horizontal"
          items={items}
        />
      </HeadMenu>
      <HeadButton>
        <ButtonContainer>
          <a href="/login">Login</a>
          <br></br>
          <Link to="/signup">
            <Button className="signupbtn">Get Started</Button>
          </Link>
        </ButtonContainer>
      </HeadButton>
      {/* <Dropdown trigger={["click"]} menu={{ items }}>
        <ProfileDropdown src={profile} alt="profile" />
      </Dropdown> */}
    </HeaderContainer>
  );
}

export default Header;
