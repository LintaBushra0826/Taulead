import React, { useState } from "react";
// import { Input, Form, Button, Divider } from "antd";
import axios from "axios";
import { FormWrapper } from "./index.styled";
// import { Link } from "react-router-dom/dist";
// import { Checkbox } from "antd/es";
// import { Footer } from "../../../../styles/global.styled";
import { FormHeader} from "../../../../styles/global.styled";

function LoginForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/login", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  };
  return (
    <FormWrapper>
      <FormHeader className="formheader">
        <h1 className="logintext">Log in</h1>
        <h2 className="loginDesc">
          Welcome to the Tau_Lead, please put your login credentials below to
          start using this software
        </h2>
      </FormHeader>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      {/* <Form name="normal_login" className="login-form" layout="vertical">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <label className="loginlabel">Email</label>
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <label className="loginlabel">Password</label>
          <Input placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <a className="login-form-forgot" href="/Login">
            Forgot password?
          </a>
        </Form.Item>

        <Divider />

        <Form.Item name="remember" valuePropName="checked">
          <Container>
            <Checkbox
              className="checkbox"
              style={{ display: "flex", alignSelf: "flex-start" }}
            >
              Remember me
            </Checkbox>

            <Link to="/Home">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Link>
          </Container>

          <Footer className="footer">
            <label className="SignUplabel">Don't have account?</label>
            <a className="signuplink" href="/Signup">
              Sign Up
            </a>
          </Footer>
        </Form.Item>
      </Form> */}
    </FormWrapper>
  );
}

export default LoginForm;
