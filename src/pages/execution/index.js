import React, { useState } from "react";
import Header from "../../layout/justheader";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import ProcessChart from "./components/processchart";
import { Button } from "antd";
import { ButtonWrapper, ChartWrapper } from "./index.styled";
import CreateProcessModal from "./components/createprocessmodal";
import { Link } from "react-router-dom";

function Execution() {
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
          <Link to="/statisticspage">
            <Button type="primary" onClick={handleOpenModal}>
              View Statistics
            </Button>
          </Link>
        </ButtonWrapper>
      </BodyWrapper>
    </>
  );
}

export default Execution;
