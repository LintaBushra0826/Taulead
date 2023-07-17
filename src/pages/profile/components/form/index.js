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
function ProfileForm() {
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
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
    <div className='divform'>
    <FormWrapper>
      <div className='formheader'>My Profile</div>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
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
        <Form.Item
          label="Name"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone No"
          name="Number "
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Business Name"
          name="Business"
          rules={[
            {
              required: true,
              message: "Please input your business name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 16,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
    </div>
    </>
  );
}

export default ProfileForm;