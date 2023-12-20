import React from "react";
import Header from "../layout/justheader";
import SideMenu from "../layout/sideMenu";
import { BodyWrapper, MainContainer } from "../styles/global.styled";
// import bodyBGImg from "../assets/images/BodyBG9.jpg";
function PrivateRoute({ children }) {
  return (
    <>
      <BodyWrapper >
      {/* <img src={bodyBGImg} style={{width: "100%", height: "100vh", opacity: "0.9", position:"absolute", top:"0%", left:"0%" }}/> */}
        <SideMenu />
         <Header />
        <MainContainer>
          {children}
        </MainContainer>
      </BodyWrapper>
    </>
  );
}

export default PrivateRoute;
