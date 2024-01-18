import React, { useEffect, useState } from "react";
import { Modal, Steps, Checkbox, Button, Divider } from "antd";
import { FormWrapper } from "./index.styled";
import axios from "axios";
import {
  CreateProcessCon,
  FormLabel,
  StepsFormDiv,
  SubProcessHeader,
} from "./index.styled";
import ProcessForm from "../updateprocessform";
import RawMaterialForm from "../rawmaterialform copy";
import HumanResourceForm from "../humanresourceform copy";
import { useAtomValue } from "jotai";
import { ProcessAtom } from "../../../../../../atoms/process.atom";
import SubProcessForm from "../../../createprocessmodal/components/subprocessmodal/components/subprocessform";
import SubRawMaterialForm from "../../../createprocessmodal/components/subprocessmodal/components/subprocessrawmaterial";
import SubHumanResourceForm from "../../../createprocessmodal/components/subprocessmodal/components/subprocesshumanresource";
import { SubProcessAtom } from "../../../../../../atoms/subprocess.atom";

function UpdateProcess({ isVisible, onClose, selectedTaskData }) {
  const [formData, setFormData] = useState({});
  const process = useAtomValue(ProcessAtom);
  const subprocess = useAtomValue(SubProcessAtom);
  const API_BASE_URL = "http://localhost:3005";
  const [current, setCurrent] = useState(1);
  const [isSubModalVisible, setSubIsModalVisible] = useState(false);
  const [showSubprocessContent, setShowSubprocessContent] = useState(false);
  const [subprocessCount, setSubprocessCount] = useState(0);

  useEffect(() => {
    setFormData(selectedTaskData);
  }, [selectedTaskData]);

  const handleCloseModal = () => {
    setSubIsModalVisible(false);
  };

  const onChangeValue = (value) => {
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
    console.log("process", process);
    try {
      const combinedData = {
        ...process,
      };

      const response = await axios.put(
        `${API_BASE_URL}/update-process/${selectedTaskData.key}`,
        combinedData
      );

      if (response.status === 200) {
        alert("Process updated successfully!");
        setFormData(response.data);

        if (showSubprocessContent) {
          setSubIsModalVisible(true);
        }
      } else {
        alert("Error updating process");
      }
    } catch (error) {
      alert("Error updating process");
    }
  };

  const handleSubSubmit = async () => {
    try {
      const combinedData = {
        ...subprocess,
        ...formData,
      };

      const response = await axios.post(
        `${API_BASE_URL}/subprocess`,
        combinedData
      );
      if (response.status === 200) {
        alert("Subprocess added successfully!");
        setSubprocessCount((prevCount) => prevCount + 1);
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
        visible={isVisible}
        onCancel={onClose}
        centered
        width={1000}
        onOk={handleSubmit}
      >
        <SubProcessHeader>
          <FormLabel>Edit Process</FormLabel>
        </SubProcessHeader>

        <br />

        <StepsFormDiv>
          <Steps
            current={current}
            labelPlacement="horizontal"
            items={items}
            onChange={(c) => {
              setCurrent(0);
            }}
          />
          <br />
          <ProcessForm processData={formData} />

          <Divider />

          <Steps
            current={current}
            labelPlacement="horizontal"
            onChange={onChangeValue}
            items={hritems}
          />
          <HumanResourceForm humanResourceData={formData.humanresource} />

          <Divider />

          <Steps
            current={current}
            labelPlacement="horizontal"
            onChange={onChangeValue}
            items={materialitems}
          />
          {/* <RawMaterialForm rawMaterialData={formData.rawmaterial} /> */}
        </StepsFormDiv>

        {/* <CreateProcessCon>
          <Checkbox onChange={handleCheckboxChange}>Create Subprocess</Checkbox>
          <Button type="primary" onClick={handleSubmit}>
           Update 
          </Button>
        </CreateProcessCon> */}

        {isSubModalVisible && (
          <Modal
            visible={isSubModalVisible}
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
                    labelPlacement="horizontal"
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
                    labelPlacement="horizontal"
                    onChange={onChangeValue}
                    items={submaterialitems}
                  />
                  <SubRawMaterialForm />

                  <Divider />
                  <Steps
                    current={current}
                    labelPlacement="horizontal"
                    onChange={onChangeValue}
                    items={subhritems}
                  />
                  <SubHumanResourceForm />
                </StepsFormDiv>
              </>
            )}
          </Modal>
        )}
      </Modal>
    </FormWrapper>
  );
}

export default UpdateProcess;
