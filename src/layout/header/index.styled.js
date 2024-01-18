import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 90px;
  animation: ${slideDown} 1.5s ease-out 0.5ms both;
`;

export const Logo = styled.img`
  position: relative;
  top: 10px;
  width: 110px;
  height: 100px;
  display: flex;
  color: white;
  text-decoration: none;
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;

export const Heading = styled.h2`
  font-size: 14pt;
  color: #702963;
  font-family: "Times New Roman";
  display: flex;
  width: fit-content;
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;

export const Username = styled.div`
  display: flex;
  color: white;
  text-decoration: none;
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;

export const HeadButton = styled.div`
  display: flex;
  background: none;
  border: none;
  color: blue;
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;

export const HeadMenu = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-items: center;
  padding-left: 160px;
  width: 700px;
  .ant-menu {
    width: 450;
    background: transparent;
    padding-left: 50px;
    font-size: 12pt;
    /* color: #210062; */
    color: #fff;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 3px;

  .loginbtn {
    color: #fff;
    display: inline-block;
    border: 1px solid;
  }
  .loginbtn:hover {
    border: 1px solid;
  }
  .signupbtn {
    width: fit-content;
    background-color: #d3cce3;
    border-color: #1d2b64;
    color: #1d2b64;
    height: 40px;
    font-weight: 500;
  }
  animation: ${slideDown} 2s ease-out 0.5ms both;
`;
