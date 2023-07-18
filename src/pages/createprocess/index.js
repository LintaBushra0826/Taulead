import React from 'react';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
import CreateProcessForm from './components/processform';


function CreateProcess() {
  return (
    <>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <MainContainer>
        <CreateProcessForm />
      </MainContainer>
    </BodyWrapper>
  </>
  );
}

export default CreateProcess;