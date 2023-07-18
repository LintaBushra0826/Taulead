import React from "react";
import { Input, Form, Row, Col } from "antd";
import { FormWrapper } from "./index.styled";

function CreateProcessForm() {
  return (
    <FormWrapper>
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
          <Form.Item
            label="Process Name"
            name="processname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Process Description"
            name="processdesc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Process Time"
            name="processtime"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </FormWrapper>
  );
}

export default CreateProcessForm;
