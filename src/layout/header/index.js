import React from "react";
import logo from "../../assets/images/logo.png";
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
import { //Dropdown, 
  Button } from "antd";
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

const ToService = () =>
  {
    window.scrollTo({top: window.innerHeight,  
      behavior: "smooth"});
  }
const items = [
  {
    label: <Link to="/home">Home</Link>,
    key: "home",
  },
  {
    label: <a href="#services-card" onClick={ToService}>Services</a>,
    key: "Services",
  },
  {
    label: "Pricing",
    key: "Pricing",
  },
  {
    label: "Help",
    key: "Help",
  },
];

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={logo} alt="logo" className="logo" />
        {/* <Heading className="HeaderHeading">
          Manufacturing Resource Pipeline
        </Heading> */}
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
          <Link to="/login">
            <a href="#">Login</a>
          </Link>
          <br></br>
          <Link to="/signup">
            <Button type="primary" className="signupbtn">Sign Up</Button>
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
