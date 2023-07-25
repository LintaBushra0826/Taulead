import React from "react";
import { Input, Form, Button, Checkbox, Divider} from "antd";
import { FormWrapper } from "./index.styled";
import Home from "../../../pages/home";
import { ButtonContainer } from "../../humanresource/components/humanResourceForm/index.styled";
import { Link } from "react-router-dom/dist";

function SignupForm() {
  return (
    <>
    <FormWrapper>
      <div className='formheader'>
        <div className='logintext'>Create account</div>
        <div className='loginDesc'>Get access to exclusive features by creating account</div>
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
        </div>
        <Divider />
        <ButtonContainer>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="checkbox">I've read and accept the</Checkbox>
            <Link to="/Home"><Button type="primary" htmlType="submit" className="login-form-button" onClick={Home}>
           create my account
          </Button></Link>
          <label className='SignUplabel'>Already have an account?</label><a className='signuplink' href='/Login'>Sign in</a>
      </Form.Item>
      </ButtonContainer>
    </Form>
    </FormWrapper>
    </>
  );
}

export default SignupForm;
