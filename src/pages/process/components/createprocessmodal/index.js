import React, { useState } from "react";
import { Modal, Steps, Checkbox, Button, Divider } from "antd";
import { FormWrapper } from "./index.styled";
import axios from "axios";
import { CreateProcessCon, FormLabel, StepsFormDiv } from "./index.styled";
import ProcessForm from "../processform";
import RawMaterialForm from "../rawmaterialform";
import HumanResourceForm from "../humanresourceform";
import { useAtomValue } from "jotai";
import { ProcessAtom } from "../../process.atom";

function CreateProcessForm({ isVisible, onClose }) {
  const process = useAtomValue(ProcessAtom);
  const [formData] = useState({});
  const API_BASE_URL = "http://localhost:3003";
  const [current, setCurrent] = useState(1);

  const onChangeValue = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const items = [
    {
      title: "Create Process",
    },
  ];

  const materialitems = [
    {
      title: "Raw Material",
    },
  ];

  const hritems = [
    {
      title: "Human Resource",
    },
  ];

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/process`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Process added successfully!");
    } catch (error) {
      console.error("Error adding process:", error);
      alert("Error adding process");
    }
  };

  // const handleCheckboxChange = (e) => {
  //   setCreateSubprocess(e.target.checked);
  //   setSubprocessModalOpen(e.target.checked);
  // };

  return (
    <FormWrapper>
      {/* <div>This is a process modal</div> */}
      <Modal
        open={isVisible}
        onCancel={onClose}
        centered
        footer={null}
        width={1000}
        onOk={handleSubmit}
      >
        <FormLabel>Process Creation</FormLabel>
        <br />

        <StepsFormDiv>
          <Steps
            current={current}
            labelPlacement="Horizontal"
            items={items}
            onChange={(c) => {
              setCurrent(0);
            }}
          />
          <br />
          <ProcessForm />

          <Divider />

          <Steps
            current={current}
            labelPlacement="Horizontal"
            onChange={onChangeValue}
            items={materialitems}
          />
          <br />

          <RawMaterialForm />

          <Divider />

          <Steps
            current={current}
            labelPlacement="Horizontal"
            onChange={onChangeValue}
            items={hritems}
          />
          <br />

          <HumanResourceForm />
        </StepsFormDiv>

        <CreateProcessCon>
          <Checkbox>Create Subprocess</Checkbox>
          {/* onChange={handleCheckboxChange} */}
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </CreateProcessCon>
      </Modal>
    </FormWrapper>
  );
}

export default CreateProcessForm;
