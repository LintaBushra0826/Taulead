import React from 'react';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
// import ProcessChart from './components/processchart';

function Process() {
  return (
    <>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <MainContainer>
        {/* <ProcessChart /> */}
      </MainContainer>
    </BodyWrapper>
  </>
  );
}

export default CreateProcess;