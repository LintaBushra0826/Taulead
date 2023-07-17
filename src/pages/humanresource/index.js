import React from 'react';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { FormWrapper } from "./index.styled";
import { Input, Form, Button } from "antd";
import Logo from '../../assets/images/logo.png';

function humanresourceForm() {
  
  return (
    <div className='divform'>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <FormWrapper>
        <div className='Formheading'>Human Resource</div>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
      <div className='fstdiv'>
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
        </div>
        <div className='scnddiv'>
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

        <Form.Item
          label="Hired on"
          name="hireon"
          rules={[
            {
              required: true,
              message: "Please input hired date",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="desig"
          rules={[
            {
              required: true,
              message: "Please input designation",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Job Description"
          name="jobDesc"
          rules={[
            {
              required: true,
              message: "Please input job description",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Skills"
          name="skills"
          rules={[
            {
              required: true,
              message: "Please input skills",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 16,
            span: 16,
          }}
        >
          <div className='btndiv'>
          <Button type="primary" htmlType="submit">
            Add Employee
          </Button><br></br>
          <Button type="primary" htmlType="submit">
            View Employee
          </Button>
          </div>
        </Form.Item>
      </Form>
      </FormWrapper>
      {/* <div className='transitiondiv'><img src={Logo} alt='logo' className='logo'/></div> */}
    </BodyWrapper>
  </div>
  );
}

export default humanresourceForm;