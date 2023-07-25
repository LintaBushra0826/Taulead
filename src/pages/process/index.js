import React, { useState } from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import ProcessChart from "./components/processchart";
import { Modal } from "antd";
import { Button, Steps } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../humanresource/components/humanResourceForm/index.styled";
import { StepsFormDiv } from "../createprocess/components/processform/index.styled";
import CreateProcessForm from "./components/createprocessform";
import RawMaterialForm from "./components/rawmaterialform";
import HumanResourceForm from "./components/humanresourceform";
import { ButtonWrapper, ChartWrapper } from "./index.styled";

function Process() {
  const [setShowMaterialform] = useState(false);
  const [showProcessform, setShowProcessform] = useState(false);
  const [setShowHrform] = useState(null);
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);

  const Processform = ({ formData }) => {
    return <CreateProcessForm />;
  };

  const Materialform = ({ formData }) => {
    return <RawMaterialForm />;
  };
  const Hrform = ({ formData }) => {
    return <HumanResourceForm />;
  };

  const description = "Details";

  const items = [
    {
      title: "Create Process",
      description,
    },
    {
      title: "Raw Material",
      description,
    },
    {
      title: "Human Resource",
      description,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleMaterialForm = (formData) => {
    setShowMaterialform(true);
  };
  const handleHrForm = (formData) => {
    setShowHrform(true);
  };
  const handleProcessForm = (formData) => {
    setShowProcessform(true);
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
          <Button type="primary" onClick={() => setOpen(true)}>
            Create Process
          </Button>
        </ButtonWrapper>

        <Modal
          open={open}
          onCancel={()=> setOpen(false)}
          //destroyOnClose={true}
          //close={close}
          centered
          footer={null}
          width={1000}
        >
          <FormHeading className="HeaderHeading">Process Creation</FormHeading>

          <Steps
            current={current}
            // percent={60}
            labelPlacement="vertical"
            items={items}
            onChange={(c) => {
              setCurrent(c);
            }}
          />
          <br />

          <StepsFormDiv>
            {current === 0 && <Processform formData={handleProcessForm} />}
            {current === 1 && !showProcessform && (
              <Materialform formData={handleMaterialForm} />
            )}
            {current === 2 && !showProcessform && (
              <Hrform formData={handleHrForm} />
            )}
          </StepsFormDiv>

          <ButtonContainer>
            {current < items.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === items.length - 1 && (
              <Button type="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            )}
            {current > 0 && current === 1 && (
              <Button onClick={() => prev()}>Previous</Button>
            )}
          </ButtonContainer>
        </Modal>
      </BodyWrapper>
    </>
  );
}

export default Process;
