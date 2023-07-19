import React from "react";
import Header from "../layout/header";
import SideMenu from "../layout/sideMenu";
import { BodyWrapper, MainContainer } from "../styles/global.styled";

function PrivateRoute({ children }) {
  return (
    <>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <MainContainer>
          {children}
        </MainContainer>
      </BodyWrapper>
    </>
  );
}

export default PrivateRoute;
