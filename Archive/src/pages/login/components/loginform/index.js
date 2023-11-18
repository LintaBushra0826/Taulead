import React, { useState } from "react";
import { Input, Form, Button, Divider, Checkbox } from "antd";
import { FormWrapper } from "./index.styled";
import {
  Container,
  Footer,
  FormHeader,
} from "../../../../styles/global.styled";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [isLoggingIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    navigate("/rawMaterial");
    // event.preventDefault();

    // // Prevent multiple login requests while one is in progress
    // if (isLoggingIn) {
    //   return;
    // }

    // console.log("Login button clicked");
    // setIsLoggingIn(true);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:3005/login",
    //     formData
    //   );
    //   console.log("Login response:", response.data)
    //   alert(response.data.message);

    //   // Redirect to home page after successful login
    //   navigate("/home");
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   alert("Login failed. Please try again later.");
    // } finally {
    //   setIsLoggingIn(false);
    // }
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

      <Form name="normal_login" className="login-form" layout="vertical">
        <Form.Item className="login-label">
          <label className="Email" name="email">
            Email
          </label>
          <Input
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <label className="Password" name="password">
            Password
          </label>
          <Input
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>

        <div className="login-form-forgot">
          <a href="/home"> Forgot Password </a>
        </div>

        <Divider />

        <Form.Item>
          <Container>
            <Checkbox> Remember me </Checkbox>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleSubmit}
              disabled={isLoggingIn} // Disable the button while login is in progress
            >
              {isLoggingIn ? "Logging In..." : "Log In"}
            </Button>
          </Container>

          <Footer>
            <label>Dont have account?</label>
            <a href="/home"> Sign up</a>
          </Footer>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;
