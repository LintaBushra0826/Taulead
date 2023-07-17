import React from 'react';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { FormWrapper } from "./index.styled";
import { Input, Form, Button } from "antd";
import Logo from '../../assets/images/logo.png';
// import measuringUnitForm from './components/form';

function measuringUnitForm() {
  
  return (
    <div className='divform'>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <FormWrapper>
        <div className='Formheading'>Measuring Unit</div>
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
      <div className='formdiv'>
        <Form.Item
          label="Unit Name"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input unit name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Unit Description"
          name="Desc"
          rules={[
            {
              required: true,
              message: "Please input unit description!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Unit Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please input unit type!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Unit Scale"
          name="scale"
          rules={[
            {
              required: true,
              message: "Please input unit scale!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </div>
        
          <Button type="primary" htmlType="submit">
            Add Item
          </Button><br></br>
          <Button type="primary" htmlType="submit">
            View Item
          </Button>
      </Form>
      </FormWrapper>
      {/* <div className='transitiondiv'><img src={Logo} alt='logo' className='logo'/></div> */}
    </BodyWrapper>
  </div>
  );
}

export default measuringUnitForm;