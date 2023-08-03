import React, { useState } from "react";
import { message } from "antd";
import { FormWrapper, FormHeader } from "./index.styled";

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
        console.log('Registration successful');
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

        <form onSubmit={handleSubmit}>
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
        </form>
      </FormWrapper>
    </>
  );
}

export default SignupForm;
