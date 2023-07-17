import React from 'react';
import { HeaderContainer } from './index.styled'
import logo from '../../assets/images/logo.png';
import LogoHome from '../../assets/images/LogoHome.png';
import profile from '../../assets/images/profile.png';
import { Button } from "antd";

function Header() {
  return (
    <HeaderContainer>
      <img src={LogoHome} alt='logo' className='logo'/>
      <h2 className='HeaderHeading'>Manufacturing Resource Pipeline</h2>

      <a href='#' className='btn1' type="primary" htmlType="submit">
        Log in
      </a><br></br>
      <a href='#' className='btn2' type="primary" htmlType="submit">
        Sign up
      </a>
      <img src={profile} alt="profile" className='profilelogo'/>

    </HeaderContainer>
  );
}

export default Header;
