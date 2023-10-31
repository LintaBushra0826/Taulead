import React, { useState } from "react";
import { Modal, Steps, Checkbox, Button, Divider } from "antd";
import { FormWrapper } from "./index.styled";
import axios from "axios";
import {
  CreateProcessCon,
  FormLabel,
  StepsFormDiv,
  SubProcessHeader,
} from "./index.styled";
import ProcessForm from "../../../processform";
import RawMaterialForm from "../../../rawmaterialform";
import HumanResourceForm from "../../../humanresourceform";
import { useAtomValue } from "jotai";
import { ProcessAtom } from "../../../../../../atoms/process.atom";
import SubProcessForm from "../../../createprocessmodal/components/subprocessmodal/components/subprocessform";
import SubRawMaterialForm from "../../../createprocessmodal/components/subprocessmodal/components/subprocessrawmaterial";
import SubHumanResourceForm from "../../../createprocessmodal/components/subprocessmodal/components/subprocesshumanresource";
import { SubProcessAtom } from "../../../../../../atoms/subprocess.atom";

function UpdateProcess({ isVisible, onClose }) {
  const [formData, setFormData] = useState({});
  const process = useAtomValue(ProcessAtom);
  const subprocess = useAtomValue(SubProcessAtom);
  const API_BASE_URL = "http://localhost:3003";
  const [current, setCurrent] = useState(1);
  const [isSubModalVisible, setSubIsModalVisible] = useState(false);
  const [showSubprocessContent, setShowSubprocessContent] = useState(false);
  const [subprocessCount, setSubprocessCount] = useState(0);

  const handleCloseModal = () => {
    setSubIsModalVisible(false);
  };

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

  const subitems = [
    {
      title: "Create Subprocess",
    },
  ];
  const submaterialitems = [
    {
      title: "Subprcoess Raw Material",
    },
  ];
  const subhritems = [
    {
      title: "Subprocess Human Resource",
    },
  ];

  const handleCheckboxChange = (e) => {
    setShowSubprocessContent(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const combinedData = {
        ...process,
      };

      const response = await axios.post(
        `${API_BASE_URL}/process`,
        combinedData
      );

      if (response.status === 200) {
        alert("Process added successfully!");
        setFormData(response.data);

        // Check if the checkbox is checked before opening the subprocess modal
        if (showSubprocessContent) {
          setSubIsModalVisible(true);
        }
      } else {
        alert("Error adding process");
      }
    } catch (error) {
      alert("Error adding process");
    }
  };

  const handleSubSubmit = async () => {
    try {
      console.log("subprocess", subprocess);

      const combinedData = {
        ...subprocess,
      };

      const response = await axios.post(
        `${API_BASE_URL}/subprocess`,
        combinedData
      );
      if (response.status === 200) {
        alert("Subprocess added successfully!");
        setSubprocessCount((prevCount) => prevCount + 1);

        // Clear the form fields for the next subprocess
        setFormData({});
      } else {
        alert("Error adding subprocess");
      }
    } catch (error) {
      alert("Error adding subprocess");
    }
  };

  const processName = `${process.name}`;
  const pID = `${process._id}`;

  return (
    <FormWrapper>
      <Modal
        open={isVisible}
        onCancel={onClose}
        centered
        footer={null}
        width={1000}
        // onOk={handleSubmit}
      >
        <SubProcessHeader>
          <FormLabel>Process Creation</FormLabel>
        </SubProcessHeader>
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

          <RawMaterialForm />

          <Divider />

          <Steps
            current={current}
            labelPlacement="Horizontal"
            onChange={onChangeValue}
            items={hritems}
          />

          <HumanResourceForm />
        </StepsFormDiv>

        <CreateProcessCon>
          <Checkbox onChange={handleCheckboxChange}>Create Subprocess</Checkbox>
          <Button type="primary" onClick={handleSubmit}>
            Submit Process
          </Button>
        </CreateProcessCon>

        {isSubModalVisible && (
          <Modal
            open={isSubModalVisible}
            onCancel={handleCloseModal}
            centered
            footer={null}
            width={1000}
            onOk={handleSubSubmit}
          >
            <SubProcessHeader>
              <FormLabel>Subprocess: {subprocessCount + 1}</FormLabel>
            </SubProcessHeader>
            <br />

            {showSubprocessContent && (
              <>
                <StepsFormDiv>
                  <Steps
                    current={current}
                    labelPlacement="Horizontal"
                    items={subitems}
                    onChange={(c) => {
                      setCurrent(0);
                    }}
                  />
                  <br />

                  <SubProcessForm
                    formData={formData}
                    setFormData={setFormData}
                    processName={processName}
                    processID={pID}
                  />

                  <Divider />
                  <Steps
                    current={current}
                    labelPlacement="Horizontal"
                    onChange={onChangeValue}
                    items={submaterialitems}
                  />
                  <SubRawMaterialForm />

                  <Divider />
                  <Steps
                    current={current}
                    labelPlacement="Horizontal"
                    onChange={onChangeValue}
                    items={subhritems}
                  />
                  <SubHumanResourceForm />
                </StepsFormDiv>
              </>
            )}

            <CreateProcessCon>
              {/* <Checkbox onChange={handleCheckboxChange}>
                Create another Subprocess
              </Checkbox> */}

              <Button onClick={handleSubSubmit}>
                Cancel
              </Button>

              <Button type="primary" onClick={handleSubSubmit}>
                Update
              </Button>
            </CreateProcessCon>
          </Modal>
        )}
      </Modal>
    </FormWrapper>
  );
}

export default UpdateProcess;
