import React from 'react';
import Header from "../../layout/header";
import SideMenu from "../../layout/sideMenu";
import { BodyWrapper } from "../../styles/global.styled";
import { FormWrapper } from "./index.styled";
import { Input, Form, Button } from "antd";
import Logo from '../../assets/images/logo.png';
// import rawMaterialForm from "./components/form";

function rawMaterial() {
  
  return (
    <div className='divform'>
    <Header />
    <BodyWrapper>
      <SideMenu />
      <FormWrapper>
        <div className='Formheading'>Raw Material</div>
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
          label="Item Name"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input item name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Item Description"
          name="Desc"
          rules={[
            {
              required: true,
              message: "Please input item description!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Item Unit"
          name="unit"
          rules={[
            {
              required: true,
              message: "Please input item unit!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Item Quantity"
          name="quan"
          rules={[
            {
              required: true,
              message: "Please input item quantity!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Item Expiry Date"
          name="expdate"
          rules={[
            {
              required: true,
              message: "Please input item expiry date!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Item Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input item price",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Total Cost"
          name="totcost"
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
          <Button type="primary" htmlType="submit">
            Add Item
          </Button><br></br>
          <Button type="primary" htmlType="submit">
            View Item
          </Button>
        </Form.Item>
      </Form>
      </FormWrapper>
      {/* <div className='transitiondiv'><img src={Logo} alt='logo' className='logo'/></div> */}
    </BodyWrapper>
  </div>
  );
}

export default rawMaterial;