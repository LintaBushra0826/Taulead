import React, { useState } from "react";
import { Input, Form, Button, message, Checkbox} from "antd";
import { FormWrapper } from "./index.styled";
import { LoadingOutlined, PlusOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload= (file)=>{
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


function SignupForm() {
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
    <FormWrapper>
      <div className='formheader'>
        <h1 className='logintext'>Create account</h1>
        <h2 className='loginDesc'>Get access to exclusive features by creating account</h2>
      </div>
        <Form
      name="normal_login"
      className="login-form"
    >
      <div className='formdiv'>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <label className='loginlabel'>User name</label><Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <label className='loginlabel'>Email Id</label><Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <label className='loginlabel'>Password</label><Input
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confrmpassword"
        rules={[{ required: true, message: 'Please input your confirm password!' }]}
      >
        <label className='loginlabel'>Confirm Password</label><Input
          placeholder="cnfrmPassword"
        />
      </Form.Item>
      <Form.Item
        name="businessname"
        rules={[{ required: true, message: 'Please input your business name!' }]}
      >
        <label className='loginlabel'>Business Name</label><Input
          placeholder="businessname"
        />
      </Form.Item>
      {/* <Form.Item
        name="businesslogo"
        rules={[{ required: true, message: 'Please input your business logo!' }]}
      >
        <label className='loginlabel'>Business logo</label><Input
          placeholder="businesslogo"
        />
      </Form.Item> */}
        </div>
        <div classname='formfooter'>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="checkbox">I've read and accept the</Checkbox><a className='termslink' href="">Terms & Conditions</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
           create my account
          </Button><label className='SignUplabel'>Already have an account?</label><a className='signuplink' href="">Sign in</a>
      </Form.Item>
      </div>
    </Form>
    </FormWrapper>
    </>
  );
}

export default SignupForm;
