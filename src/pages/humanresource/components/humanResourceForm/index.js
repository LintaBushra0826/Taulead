import React from "react";
import { Input, Form, Button, Row, Col } from "antd";
import { FormHeading, FormWrapper, ButtonContainer} from "./index.styled";


//import profilepic from '../../assets/images/profile.png';
function HumanresourceForm() {
  return (
    <FormWrapper>
      <FormHeading className="HeaderHeading">
          Human Resource Inventory
        </FormHeading>
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
              label="ID"
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please input employee id!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input employee name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[
              {
                required: true,
                message: "Please input salary!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Hired On"
            name="hired"
            rules={[
              {
                required: true,
                message: "Please input hire date!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Designation"
            name="desgn"
            rules={[
              {
                required: true,
                message: "Please input designation!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Job Description"
            name="Desc"
            rules={[
              {
                required: true,
                message: "Please input job description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

          <Col span={8}>
          <Form.Item
            label="Skills"
            name="skills"
            rules={[
              {
                required: true,
                message: "Please input skills!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>

        </Row>
        
        <Form.Item>
          <ButtonContainer>
            <Button type="primary">
              Add Employee
            </Button>
            <br></br>
            <Button>
              View Employee
            </Button>
            </ButtonContainer>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default HumanresourceForm;
