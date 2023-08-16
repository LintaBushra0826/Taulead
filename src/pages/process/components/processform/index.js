import { Col, DatePicker, Form, Input, Row } from "antd";
import React, { useState } from "react";

function ProcessForm() {
  const [formData, setFormData] = useState({});

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);

    // Convert the js object to a JavaScript Date object
    const startDate = value ? value.toDate() : null;

    setFormData({ ...formData, start: startDate });
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
            <DatePicker
              showTime
              onChange={onChange}
              onOk={onOk}
              value={formData.start}
            />
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
