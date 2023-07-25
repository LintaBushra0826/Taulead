
import React, { useState } from "react";
import { Input, Form, message, Button } from "antd";
import { FormWrapper } from "./index.styled";
import { Link } from "react-router-dom";

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
function measuringunitForm() {
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
          <Link to="/viewmeasuringunits">
          <Button type="primary" htmlType="submit">
            View Item
          </Button>
          </Link>
      </Form>
    </FormWrapper>
    </div>
    </>
  );
}

export default measuringunitForm;
