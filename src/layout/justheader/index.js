import React from 'react';
import { HeaderContainer } from './index.styled'
import Logo from '../../assets/images/logo.png';

function justheader() {
  return (
    <HeaderContainer>
      <img src={Logo} alt='logo' className='logo'/>
      <h2 className='justheader'>τau_Lead</h2>
    </HeaderContainer>
  );
}

export default justheader;
