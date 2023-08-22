import { Col, DatePicker, Form, Input, Row } from "antd";
import { useAtom } from "jotai";
import React from "react";
import { ProcessAtom } from "../../../../../../process.atom";

function SubProcessForm({ formData, setFormData }) {
  const [setProcess] = useAtom(ProcessAtom);

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
            <DatePicker showTime onChange={onChange} />
          </Form.Item>
        </Col>
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
      <Row gutter={8}>
        <Col padding="0px" span={8}>
          <Form.Item label="Link to" name="sublink">
            <Input
              name=""
              value={formData.subduration}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default SubProcessForm;
