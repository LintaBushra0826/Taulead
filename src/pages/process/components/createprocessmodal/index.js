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
import ProcessForm from "../processform";
import RawMaterialForm from "../rawmaterialform";
import HumanResourceForm from "../humanresourceform";
import { useAtomValue } from "jotai";
import { ProcessAtom } from "../../../../atoms/process.atom";
import SubProcessForm from "../createprocessmodal/components/subprocessmodal/components/subprocessform";
import SubRawMaterialForm from "../createprocessmodal/components/subprocessmodal/components/subprocessrawmaterial";
import SubHumanResourceForm from "../createprocessmodal/components/subprocessmodal/components/subprocesshumanresource";
import { SubProcessAtom } from "../../../../atoms/subprocess.atom";

function CreateProcessModal({ isVisible, onClose }) {
  const [formData, setFormData] = useState({});
  const process = useAtomValue(ProcessAtom);
  const subprocess = useAtomValue(SubProcessAtom);
  const API_BASE_URL = "http://localhost:3005";
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
      console.log("process.humanresource", process.humanResource);
      const combinedData = {
        ...process,
      };

      console.log("combineddata", combinedData);

      const response = await axios.post(
        `${API_BASE_URL}/process`,
        combinedData
      );

      if (response.status === 200) {
        console.log("response", response);
        alert("Process added successfully!");
        setFormData(response.data);

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
        console.log("response", response);
        alert("SubProcess added successfully!");
        setSubprocessCount((prevCount) => prevCount + 1);

        if (showSubprocessContent) {
          setSubIsModalVisible(true);
        }
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
        onOk={handleSubmit}
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
              <Checkbox onChange={handleCheckboxChange}>
                Create another Subprocess
              </Checkbox>

              <Button type="primary" onClick={handleSubSubmit}>
                Submit Subprocess
              </Button>
            </CreateProcessCon>
          </Modal>
        )}
      </Modal>
    </FormWrapper>
  );
}

export default CreateProcessModal;
