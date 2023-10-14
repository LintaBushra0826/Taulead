import React from "react";
import RawmaterialChart from "./components/RawMaterialChart";
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
        <RawmaterialChart />
      </MainContainer>
    </BodyWrapper>
  </>
  );
}

export default rawMaterialstats;
