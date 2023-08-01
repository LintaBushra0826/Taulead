import React, { useState, message } from "react";
import { Input, Form, Button, Checkbox, Divider } from "antd";
import { FormWrapper, FormHeader } from "./index.styled";
import { Footer } from "../../../styles/global.styled";
import { Container } from "../../../styles/global.styled";
import { Link } from "react-router-dom";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    businessname: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("1");
    try {
      const response = await fetch("http://localhost:3003/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message); // Show success message
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
          businessname: "",
        });
      } else {
        const errorData = await response.json();
        message.error(errorData.message); // Show error message
      }
    } catch (error) {
      console.error("Error during signup:", error);
      message.error("Signup failed. Please try again later."); // Show error message
    }
  };

  return (
    <>
      <FormWrapper>
        <FormHeader>
          <div className="logintext">Create account</div>
          <div className="loginDesc">
            Get access to exclusive features by creating account
          </div>
        </FormHeader>

        {/* <form onSubmit={handleSubmit}>
        <input
          label = "User Name"
          type="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
        label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
        label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
         <input
         label="Confirm Password"
          type="confirmpassword"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
         <input
         label="Business Name"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form> */}
        {/* <Form
          name="normal_login"
          className="login-form"
          onSubmit={handleSubmit}
        >
          <Form.Item label="User name" name="username">
            <Input placeholder="Username" value={formData.username} required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" value={formData.email} required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" value={formData.password} required />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmpassword">
            <Input
              placeholder="Confirm Password"
              value={formData.confirmpassword}
              required
            />
          </Form.Item>
          <Form.Item label="Business Name" name="businessname">
            <Input
              placeholder="Business Name"
              value={formData.businessname}
              required
            />
          </Form.Item>

          <Divider />

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="checkbox">I've read and accept the</Checkbox>
            <Container>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                create my account
              </Button>
            </Container>
          </Form.Item>

          <Form.Item>
            <Footer>
              <label className="SignUplabel">Already have an account?</label>
              <a className="signuplink" href="/Login">
                Sign in
              </a>
            </Footer>
          </Form.Item>
        </Form> */}
        <Form name="normal_login" className="login-form" layout="vertical" onSubmit={handleSubmit}>
        <Form.Item
          name="username"
        >
          <label className="loginlabel">User Name</label>
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item
          name="email"
        >
          <label className="loginlabel">Email</label>
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
        >
          <label className="loginlabel">Password</label>
          <Input placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="cnfrmpass"
        >
          <label className="loginlabel">Confirm Password</label>
          <Input placeholder="cnfrmPassword" />
        </Form.Item>

        <Form.Item
          name="businessname"
        >
          <label className="loginlabel">Business Name</label>
          <Input placeholder="businessname" />
        </Form.Item>


        <Divider />

        <Form.Item name="remember" valuePropName="checked">
          <Container>
            <Checkbox
              className="checkbox"
              style={{ display: "flex", alignSelf: "flex-start" }}
            >
              I have agree the terms and conditions
            </Checkbox>

            <Link to="/Home">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
               create account
              </Button>
            </Link>
          </Container>

          <Footer className="footer">
            <label className="SignUplabel">Already have account?</label>
            <a className="signuplink" href="/Signup">
              Log in
            </a>
          </Footer>
        </Form.Item>
      </Form>
      </FormWrapper>
    </>
  );
}

export default SignupForm;
