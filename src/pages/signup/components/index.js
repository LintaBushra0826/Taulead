import React, { useState } from "react";
import { Button, Checkbox, message } from "antd";
import { FormWrapper, FormHeader, Container, Btn } from "./index.styled";
import { Input, Form, Divider } from "antd";
import { Footer } from "../../../styles/global.styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = "http://localhost:3005";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    businessname: "",
    status: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const sign = await axios.post(`${API_BASE_URL}/signup`, formData);
      console.log(sign);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert("Error creating account");
    }
  };

  return (
    <>
      <FormWrapper>
        <FormHeader>
          <div className="logintext">Create Account</div>
          <div className="loginDesc">
            Get access to exclusive features by creating an account
          </div>
        </FormHeader>

        <Form
          name="basic"
          className="login-form"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <label className="Username" name="username">
              Username
            </label>
            <Input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <label className="Email" name="email">
              Email
            </label>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <label label="password" name="password">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <label className="Confirm Password" name="confirmpassword">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <label className="Business Name" name="businessname">
              Business Name
            </label>
            <Input
              placeholder="Business Name"
              name="businessname"
              value={formData.businessname}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <label className="Status" name="status">
              Who You Are?
            </label>
            <Input
              placeholder="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Container>
              <Checkbox style={{ marginTop: "16px" }}>
                {" "}
                I have agree with terms and conditions{" "}
              </Checkbox>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleSubmit}
              >
                Create my Account
              </Button>
            </Container>

            <Footer>
              <label>Already have an account?</label>
              <a href="/login"> Sign In</a>
            </Footer>
          </Form.Item>
        </Form>
      </FormWrapper>
    </>
  );
}
export default SignupForm;
