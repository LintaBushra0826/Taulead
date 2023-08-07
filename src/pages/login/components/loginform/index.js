import React, { useState } from "react";
import { Input, Form, Button, Divider } from "antd";
import axios from "axios";
import { FormWrapper } from "./index.styled";
import { FormHeader } from "../../../../styles/global.styled";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Updated to use useNavigate

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

    // Prevent multiple login requests while one is in progress
    if (isLoggingIn) {
      return;
    }

    console.log("Login button clicked");
    setIsLoggingIn(true);

    try {
      const response = await axios.post(
        "http://localhost:3003/login",
        formData
      );
      console.log("Login response:", response.data); // Log the response data
      alert(response.data.message);

      // Redirect to home page after successful login
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    } finally {
      setIsLoggingIn(false);
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

      <Form name="normal_login" className="login-form" layout="vertical">
        <Form.Item label="Email" name="email">
          <Input
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
            disabled={isLoggingIn} // Disable the button while login is in progress
          >
            {isLoggingIn ? "Logging In..." : "Log In"}
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;