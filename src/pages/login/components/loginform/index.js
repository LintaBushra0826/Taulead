import React from "react";
import { Input, Form, Button, Checkbox} from "antd";
import { FormWrapper } from "./index.styled";

function LoginForm() {
  return (
    <FormWrapper>
      <div className='formheader'>
        <h1 className='logintext'>Log in</h1>
        <h2 className='loginDesc'>Welcome to the Tau_Lead, please put your login credentials below to start using this software</h2>
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
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <label className='loginlabel'>Password</label><Input
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
      <a className="login-form-forgot" href='/Login'>
          Forgot password?
        </a>
        </Form.Item>
        </div>
        <div classname='formfooter'>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="checkbox">Remember me</Checkbox>
          <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button><label className='SignUplabel'>Don't have account?</label><a className='signuplink' href='/Signup'>Sign Up</a>
      </Form.Item>
      </div>
    </Form>
    </FormWrapper>
  );
}

export default LoginForm;
