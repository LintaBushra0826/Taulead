import React, { useState } from "react";
import { Input, Upload, Form, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FormWrapper } from "./index.styled";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

//import profilepic from '../../assets/images/profile.png';
function viewrawmaterialForm() {
  const [name, setName] = useState("Linta Bushra Khaliq");
  const [email, setEmail] = useState("linta124@gmail.com");
  const [pass, setPass] = useState("**********");
  const [number, setNumber] = useState("+92 333 8208109");
  const [bName, setBname] = useState("Medicine Manufacturing");
  const inputRef = useState("");
  const [Image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  return (
    <>
    <div className='formdiv'>
    <FormWrapper>
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
    </div>
    </>
  );
}

export default viewrawmaterialForm;