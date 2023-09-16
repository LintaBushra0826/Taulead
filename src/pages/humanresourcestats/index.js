import React from "react";
import HumanResourceChart from "./components/humanResourceChart";
import Header from "../../layout/dashboardheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper, MainContainer } from "../../styles/global.styled";
function rawMaterialstats() {
  return(
  <>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <MainContainer>
        <HumanResourceChart />
      </MainContainer>
    </BodyWrapper>
  </>
  );
}

export default rawMaterialstats;
