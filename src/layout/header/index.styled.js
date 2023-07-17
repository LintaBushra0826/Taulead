import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background: linear-gradient(135deg, #3c1053,#ad5389);
  width:auto;
  height: 70px;
  box-shadow: 0 7px 11px 0 white;
  color:white;
  img{
    width:55px;
    height: 60px;
    margin-left:30px;
    margin-top: 0px;
    display :inline-flex;
  }
  .HeaderHeading{
    padding-top: -10px;
    margin-top: -40px; 
    margin-left: 100px;
    font-size: 14pt;
    font-family:"Times New Roman";
    display:flex;
    width:fit-content;
  }
  .btn1{
    margin-left:1170px;
    margin-right: 0px;
    margin-top:-30px;
    display:flex;
    color:white;
    text-decoration: none;
  }
  .btn2{
    margin-left:1240px;
    margin-right: 0px;
    margin-top:-38px;
    display:flex;
    color:white;
    text-decoration: none;
  }

  .profilelogo{
    width:40px;
    height: 45px;
    margin-left:1330px;
    margin-right: 0px;
    margin-top:-40px;
    display:flex;
    color:white;
    text-decoration: none;
  }
`;