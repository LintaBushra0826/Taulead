import React, { useState } from "react";
import { Button, Steps, message } from "antd";
import { ButtonContainer, FormHeading } from "../../../humanresource/components/humanResourceForm/index.styled";
import { StepsContainer, StepsFormDiv } from "./index.styled";

function CreateProcessForm() {
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

      <StepsContainer>
      <Steps current={0} percent={60} labelPlacement="vertical" items={items} />
      <br />
      </StepsContainer>
      <StepsFormDiv>


      </StepsFormDiv>
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
      {current > 0 && (
        <Button
          style={{
            margin: "50px",
          }}
          onClick={() => prev()}
        >
          Previous
        </Button>
      )}
       </ButtonContainer>
    </>
  );
}

export default CreateProcessForm;
