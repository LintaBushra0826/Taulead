import { Col, DatePicker, Form, Input, Row } from "antd";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { SubProcessAtom } from "../../../../../../../../atoms/subprocess.atom";
import { ProcessAtom } from "../../../../../../../../atoms/process.atom";

function SubProcessForm({ formData, setFormData, processName, processID }) {
  const process = useAtomValue(ProcessAtom);
  const setSubProcess = useSetAtom(SubProcessAtom);
  const [pName, setPName] = useState(processName);
  const [pid, setPID] = useState(processID);

  useEffect(() => {
    // Update pName in the SubProcessAtom when processName changes
    setSubProcess((prevSubprocess) => ({
      ...prevSubprocess,
      pName: processName,
      pid: processID,
    }));
    // Update the controlled component value
    setPName(processName);
    setPID(processID);
  }, [processName, setSubProcess], [processID, setPID]);

  const onStartChange = (value, dateString) => {
    console.log("Selected Start Time: ", value);
    console.log("Formatted Selected Start Time: ", dateString);

    const startDate = value ? value.toDate() : null;

    setFormData((prevData) => ({
      ...prevData,
      substart: startDate,
    }));
    setSubProcess((prevProcess) => ({
      ...prevProcess,
      substart: startDate,
    }));
  };

  const onEndChange = (value, dateString) => {
    console.log("Selected End Time: ", value);
    console.log("Formatted Selected End Time: ", dateString);

    const endDate = value ? value.toDate() : null;

    setFormData((prevData) => ({
      ...prevData,
      subend: endDate,
    }));
    setSubProcess((prevProcess) => ({
      ...prevProcess,
      subend: endDate,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setSubProcess((prevSubprocess) => ({ ...prevSubprocess, [name]: value }));
  };

  // Function to set the "Process Name" field in the form without triggering onChange
  const setProcessFieldValue = (pName, processID) => {
    form.setFieldsValue({ pName: pName });
    form.setFieldsValue({ pid: processID });
  };

  const [form] = Form.useForm(); // Create a form instance

  React.useEffect(() => {
    // Set the initial value for the "Process Name" field
    setProcessFieldValue(processName, processID);
  }, [processName], [processID]);


  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        subname: "",
        subdesc: "",
        substart: null,
        subend: null,
        pName: processName,
        pID: processID,
      }}
      autoComplete="on"
    >
      <Row gutter={20} justify="start">
        <Col padding="0px" span={8}>
          <Form.Item label="Process Name" name="pName">
            <Input name="pName" value={processName} readOnly />
          </Form.Item>
        </Col>

        <Col padding="0px" span={8}>
        <Form.Item label="Hidden Process Id" name="hiddenPID" hidden>
            <Input name="pID" value={processID} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
      <Col span={8}>
          <Form.Item label="SubProcess ID" name="subId">
            <Input
              name="subId"
              value={formData.subId}
              onChange={handleInputChange}
              placeholder="SUB-1"
            />
          </Form.Item>
        </Col>
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
            <DatePicker showTime onChange={onStartChange} />
          </Form.Item>
        </Col>
        <Col padding="0px" span={8}>
          <Form.Item label="Subprocess End Date" name="subend">
            <DatePicker showTime onChange={onEndChange} />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={8}>
        <Col padding="0px" span={8}>
          <Form.Item label="Link to" name="sublink">
            <Input
              name=""
              value={formData.subduration}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row> */}
    </Form>
  );
}

export default SubProcessForm;
