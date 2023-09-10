import React from "react";
import Header from "../../layout/dashboardheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { FormWrapper } from "./index.styled";
import MeasuringUnitForm from "./components/index";

function measuringUnitForm() {
  return (
    <div className="divform">
      <Header />
      <BodyWrapper>
        <SideMenu />
        <FormWrapper>
         <MeasuringUnitForm />
        </FormWrapper>
      </BodyWrapper>
    </div>
  );
}

export default measuringUnitForm;
