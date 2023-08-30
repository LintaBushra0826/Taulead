import React, { useState } from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import ProcessChart from "./components/processchart";
import { Button } from "antd";
import { ButtonWrapper, ChartWrapper } from "./index.styled";
import CreateProcessModal from "./components/createprocessmodal";

function Process() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    console.log("Modal should open");
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />
      <BodyWrapper>
        <SideMenu />
        <ChartWrapper>
          <ProcessChart />
        </ChartWrapper>

        <ButtonWrapper>
          <Button type="primary" onClick={handleOpenModal}>
            Create Process
          </Button>
        </ButtonWrapper>

        <CreateProcessModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />
      </BodyWrapper>
    </>
  );
}

export default Process;
