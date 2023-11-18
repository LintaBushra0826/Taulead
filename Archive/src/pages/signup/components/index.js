import React, { useState } from "react";
import { Checkbox, message } from "antd";
import { FormWrapper, FormHeader, Container } from "./index.styled";
// import { Checkbox } from "antd/es";
// import { Footer } from "../../../../styles/global.styled";
import { Input, Form, Button, Divider } from "antd";
import { Footer } from "../../../styles/global.styled";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    businessname: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ON SUBMIT FUNCTION CALLED");
    try {
      const response = await fetch("http://localhost:3005/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful");
        message.success(data.message);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
          businessname: "",
        });
      } else {
        const errorData = await response.json();
        message.error(errorData.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      message.error("Signup failed. Please try again later.");
    }
  };

  return (
    <>
      <FormWrapper>
        <FormHeader>
          <div className="logintext">Create account</div>
          <div className="loginDesc">
            Get access to exclusive features by creating an account
          </div>
        </FormHeader>

        {/* <form onSubmit={handleSubmit}>
          <input
            label="User Name"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange} // Add onChange event handler
          />
          <input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange} // Add onChange event handler
          />
          <input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange} // Add onChange event handler
          />
          <input
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange} // Add onChange event handler
          />
          <input
            label="Business Name"
            type="text"
            name="businessname"
            placeholder="Business Name"
            value={formData.businessname}
            onChange={handleChange} // Add onChange event handler
          />
          <button type="submit">Sign Up</button>
        </form> */}

        <Form name="normal_login" className="login-form" layout="vertical">
          <Form.Item>
            <label className="Username" name="username">
              Username
            </label>
            <Input
              placeholder="username"
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
              placeholder="email"
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
              placeholder="password"
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
              placeholder="confirm password"
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
              placeholder="business name"
              name="businessname"
              value={formData.businessname}
              onChange={handleChange}
            />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Container>
              <Checkbox> I have agree with terms and conditions </Checkbox>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleSubmit}
              >
                create my account
              </Button>
            </Container>

            <Footer>
              <label>Already have an account?</label>
              <a href="/home"> Sign In</a>
            </Footer>
          </Form.Item>
        </Form>
      </FormWrapper>
    </>
  );
}
export default SignupForm;
