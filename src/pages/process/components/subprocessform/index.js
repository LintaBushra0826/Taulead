import React, { useState } from "react";
import { FormWrapper } from "./index.styled";
import axios from "axios";
import { Modal, Divider, Form, Row, Col, Input, DatePicker, Steps } from "antd";
import { FormLabel, StepsFormDiv, SubprocessDiv } from "../../index.styled";
import RawMaterialForm from "../rawmaterialform";
import HumanResourceForm from "../humanresourceform";

function SubProcessForm() {
  const [setShowMaterialform] = useState(false);
  const [setShowHrform] = useState(null);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState([]);
  const [selectedHumanResource, setSelectedHumanResource] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [formData, setFormData] = useState({});
  const API_BASE_URL = "http://localhost:3003";

  const onChangeValue = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const onSubProcessChange = (value, dateString) => {
    console.log("Selected Subprocess Time: ", value);
    console.log("Formatted Subprocess Time: ", dateString);

    const subStartDate = value ? value.toDate() : null;

    setFormData({ ...formData, substart: subStartDate });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubSubmit = async () => {
    try {
      // Create a new subprocess object with form data and selected data
      const subprocessData = {
        ...formData, // Subprocess form data
        rawMaterials: selectedRawMaterial, // Selected raw materials
        humanResources: selectedHumanResource,
      };

      await axios.post(`${API_BASE_URL}/subprocess`, subprocessData);
      alert("Subprocess added successfully!");
      setOpen(false);
    } catch (error) {
      alert("Error adding subprocess");
    }
  };

  const handleMaterialForm = (formData) => {
    setShowMaterialform(true);
  };
  const handleHrForm = (formData) => {
    setShowHrform(true);
  };

  const Materialform = ({ formData }) => {
    return <RawMaterialForm />;
  };
  const Hrform = ({ formData }) => {
    return <HumanResourceForm />;
  };

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
  const subprocessitem = [
    {
      title: "Create Subprocess",
    },
  ];


  return (
    <FormWrapper>
      <Modal
        open={open}
        centered
        width={1000}
        onOk={handleSubSubmit}
        onCancel={() => setSubprocessOpen(false)}
      >
        <FormLabel>Subprocess</FormLabel>
        <br />

        <StepsFormDiv>
          <Steps
            current={current}
            labelPlacement="Horizontal"
            onChange={onChangeValue}
            items={subprocessitem}
          />
          <br />

          {/* <SubprocessForm formData={handleSubProcessForm} /> */}
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubSubmit}
            autoComplete="off"
          >
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item label="Subprocess Name" name="subname">
                  <Input
                    name="subname"
                    value={formData.subname}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="Subprocess Description" name="subdesc">
                  <Input
                    name="subdesc"
                    value={formData.subdesc}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} justify="start">
              <Col span={8}>
                <Form.Item label="Subprocess Start Date" name="substart">
                  <DatePicker
                    name="substart"
                    showTime
                    onChange={onSubProcessChange}
                    onOk={onOk}
                    value={formData.substart}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col padding="0px" span={8}>
                <Form.Item label="Subprocess Duration" name="subduration">
                  <Input
                    name="subduration"
                    value={formData.subduration}
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Divider />

          <Steps
            current={current}
            labelPlacement="Horizontal"
            onChange={onChangeValue}
            items={materialitems}
          />
          <br />

          <SubprocessDiv>
            <Materialform formData={handleMaterialForm} />
          </SubprocessDiv>

          <Divider />

          <Steps
            current={current}
            labelPlacement="Horizontal"
            onChange={onChangeValue}
            items={hritems}
          />
          <br />

          <SubprocessDiv>
            <Hrform formData={handleHrForm} />
          </SubprocessDiv>
        </StepsFormDiv>
      </Modal>
    </FormWrapper>
  );
}

export default SubProcessForm;
