import React, { useState } from "react";
import "gantt-task-react-pro/dist/index.css";
import { Button, Steps, message } from "antd";
import { ButtonContainer, FormHeading } from "../../../humanresource/components/humanResourceForm/index.styled";
import { StepsFormDiv } from "../../../createprocess/components/processform/index.styled";

function ModalForm() {
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
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <FormHeading className="HeaderHeading">Process Creation</FormHeading>

      <Steps current={0} percent={60} labelPlacement="vertical" items={items} />
      <br />

      <StepsFormDiv>{/* form elements */}</StepsFormDiv>

      <ButtonContainer>
        {current < items.length - 1 && (
          <Button type="primary" onClick={() => next()}>
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
    </>
  );
}

export default ModalForm;
