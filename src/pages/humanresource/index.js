import React from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
import HumanresourceForm from "./components/humanResourceForm";

function humanresourceForm() {
  return (
    <>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <MainContainer>
          <HumanresourceForm />
        </MainContainer>
      </BodyWrapper>
    </>
  );
}

export default humanresourceForm;
