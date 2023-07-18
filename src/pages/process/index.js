import React, { useState } from "react";
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
// import ProcessChart from "./components/processchart";
import { Modal } from "antd";
import { Button, Steps, message } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../humanresource/components/humanResourceForm/index.styled";
import { StepsFormDiv } from "../createprocess/components/processform/index.styled";
import CreateProcessForm from "./components/createprocessform";
import rawmaterialform from "./components/rawmaterialform";
import createprocessform from "./components/createprocessform";

function Process() {
  const [showcreateprocessform, setshowcreateprocessform] = useState(true);
  const [showrawmaterialform, setshowrawmaterialform] = useState(true);
  const [showhumanresourceform, setshowhumanresourceform] = useState(false);
  //const [loading, setLoading] = useState(false);

  // const handleNextClick = () => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     console.log('Next button clicked! Navigating to the next step...');

  //     setLoading(false);
  //   }, 2000);
  // };
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
  const [current, setCurrent] = useState(1);
  const next = () => {
    setCurrent(current + 1);
    // if (current == 0) {
    //   setshowcreateprocessform(true);
    // } else if (current == 1) {
    //   setshowrawmaterialform(true);
    // }else if (current == 2) {
    //   setshowhumanresourceform(true);
    // }
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header />
      <BodyWrapper>
        <SideMenu />
        {/* <ProcessChart /> */}
        <Button type="primary" onClick={() => setOpen(true)}>
          Create Process
        </Button>
        <Modal open={open} centered footer={null} width={1000}>
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
            <CreateProcessForm />
          </StepsFormDiv>

          <ButtonContainer>
            {current < items.length - 1 && (
              <Button type="primary" onClick={() => next() }>
                Next
              </Button>
            )}
            {current === items.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
          </ButtonContainer>
        </Modal>
      </BodyWrapper>
    </>
  );
}

export default Process;
