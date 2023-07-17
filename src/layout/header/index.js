import React from 'react';
import { HeaderContainer } from './index.styled'
import LogoHome from '../../assets/images/LogoHome.png';
import profile from '../../assets/images/profile.png';

function Header() {
  return (
    <HeaderContainer>
      <img src={LogoHome} alt='logo' className='logo'/>
      <h2 className='HeaderHeading'>Manufacturing Resource Pipeline</h2>
      
      <a href='/Login' className='btn1' type="primary" htmlType="submit">
        Log in
      </a><br></br>
      <a href='/Signup' className='btn2' type="primary" htmlType="submit">
        Sign up
      </a>
      <img src={profile} alt="profile" className='profilelogo'/>

    </HeaderContainer>
  );
}

export default Header;
