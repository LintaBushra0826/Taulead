import React, { useState } from "react";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import ProcessChart from "./components/processchart";
import { Button } from "antd";
import { ButtonWrapper, ChartWrapper } from "./index.styled";
import CreateProcessModal from "./components/createprocessmodal";

function Process() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <BodyWrapper>
        <SideMenu />
        <Header />

        <ChartWrapper>
          <ProcessChart />
        </ChartWrapper>

        <ButtonWrapper>
          <Button type="primary" onClick={handleOpenModal}>
            Create New Process
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
