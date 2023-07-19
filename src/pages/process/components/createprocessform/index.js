import React from "react";
import { Input, Form, Row, Col, DatePicker } from "antd";

import { FormWrapper } from "./index.styled";

function CreateProcessForm() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
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
          <Col span={16}>
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
        </Row>
        <Row gutter={20} justify="start">
          <Col span={8}>
            <Form.Item
              label="Process Start Date"
              name="processstart"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker onChange={onChange} style={{ margin: "0px" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Process End Date"
              name="processend"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col padding="0px" span={8}>
            <Form.Item
              label="Process Duration"
              name="processduration"
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
