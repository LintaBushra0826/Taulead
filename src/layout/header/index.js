import React from "react";
import logo from "../../assets/images/Logo white.png";
import {
  HeaderContainer,
  Logo,
  LogoContainer,
  HeadMenu,
  BtnContainer,
  HeadButton,
} from "./index.styled";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Menu } from "antd";


function Header({ scrollToContactUs }) {


  const ToService = () => {
    window.scrollTo({ top: window.outerHeight, behavior: "smooth" });
  };
    const ToContactUs = () => {
      scrollToContactUs(); 
    };
  const items = [
    {
      label: <Link to="/home">Home</Link>,
      key: "home",
    },
    {
      label: "About Us",
      key: (
        <p onClick={ToContactUs}>
          About Us
        </p>
      ),
    },
    {
      label: (
        <p onClick={ToService}>
          Services
        </p>
      ),
      key: "Services",
    },
    {
      label: "Contact Us",
      key: (
        <p onClick={ToContactUs}>
          Contact Us
        </p>
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
        <BtnContainer>
        <Link to="/login">
          <Button className="loginbtn">Login</Button>
          </Link>
          <br></br>
          <Link to="/signup">
            <Button className="signupbtn">Get Started</Button>
          </Link>
        </BtnContainer>
      </HeadButton>
    </HeaderContainer>
  );
}

export default Header;
