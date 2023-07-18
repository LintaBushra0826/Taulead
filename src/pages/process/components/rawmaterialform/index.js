import React from "react";
import { Input, Form, Row, Col } from "antd";
import { FormWrapper } from "../createprocessform/index.styled";

function RawMaterialForm() {
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
              label="Item Name"
              name="itemname"
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
              label="Item Quantity"
              name="itemquan"
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
              label="Item Unit"
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

export default RawMaterialForm;
