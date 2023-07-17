import React from "react";
import { Input, Form, Button, Checkbox} from "antd";
import { FormWrapper } from "./index.styled";

function SignupForm() {
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
        </div>
        <div classname='formfooter'>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="checkbox">I've read and accept the</Checkbox><a className='termslink' href='/Signup'>Terms & Conditions</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
           create my account
          </Button><label className='SignUplabel'>Already have an account?</label><a className='signuplink' href='/Login'>Sign in</a>
      </Form.Item>
      </div>
    </Form>
    </FormWrapper>
    </>
  );
}

export default SignupForm;
