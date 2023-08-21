import { Col, DatePicker, Form, Input, Row } from "antd";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { ProcessAtom } from "../../process.atom";

function ProcessForm({ formData, setFormData }) {
  const [process, setProcess] = useAtom(ProcessAtom);

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const startDate = value ? value.toDate() : null;

    setFormData((prevData) => ({ ...prevData, start: startDate }));
    setProcess((prevProcess) => ({ ...prevProcess, start: startDate }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setProcess((prevProcess) => ({ ...prevProcess, [name]: value }));
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Process Name" name="name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Process Description" name="desc">
            <Input
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20} justify="start">
        <Col span={8}>
          <Form.Item label="Process Start Date" name="start">
            <DatePicker showTime onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col padding="0px" span={8}>
          <Form.Item label="Process Duration" name="duration">
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ProcessForm;
