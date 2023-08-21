import React, { useState } from "react";
import { Modal, Steps, Checkbox, Button, Divider } from "antd";
import { FormWrapper } from "./index.styled";
import axios from "axios";
import { CreateProcessCon, FormLabel, StepsFormDiv } from "./index.styled";
import ProcessForm from "../processform";
import RawMaterialForm from "../rawmaterialform";
import HumanResourceForm from "../humanresourceform";
import { useAtomValue } from "jotai";
import {
  ProcessAtom,
  // UpdateRawMaterialAtom,
  // UpdateHumanResourceAtom,
} from "../../process.atom";

function CreateProcessForm({ isVisible, onClose }) {
  const [formData, setFormData] = useState({});
  const process = useAtomValue(ProcessAtom);
  // const [updateRawMaterial] = useAtom(UpdateRawMaterialAtom);
  // const [updateHumanResource] = useAtom(UpdateHumanResourceAtom);
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
      console.log("process", process);

      const combinedData = {
        // ...formData,
        // rawMaterial: updateRawMaterial,
        // humanResource: updateHumanResource,
        ...process,
      };

      const response = await axios.post(
        `${API_BASE_URL}/process`,
        combinedData
      );
      if (response.status === 200) {
        alert("process added successfully!");
      } else {
        alert("Error adding process");
      }
    } catch (error) {
      alert("Error adding process");
    }
  };

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
          <ProcessForm formData={formData} setFormData={setFormData} />

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
