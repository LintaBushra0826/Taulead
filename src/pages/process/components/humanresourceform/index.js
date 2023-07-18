import React from "react";
import { Input, Form, Row, Col } from "antd";
import { FormWrapper } from "../createprocessform/index.styled";

function HumanResourceForm() {
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
              label="Employee Name"
              name="empname"
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
              label="Employee Designation"
              name="empdesgn"
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
              label="Employees Skills"
              name="itemunit"
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

export default HumanResourceForm;
