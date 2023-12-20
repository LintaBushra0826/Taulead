import React, { useState } from "react";
import { Input, Form, Button, Row, Col } from "antd";
import { FormHeading, FormWrapper, ButtonContainer } from "./index.styled";
import axios from "axios";
import { useLocation } from "react-router-dom";

function HumanresourceForm() {
  const location = useLocation();
  const API_BASE_URL = "http://localhost:3005";
  const [formData, setFormData] = useState({
    tag: "available",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/humanresource`, formData);
      alert("Employee added successfully!");
    } catch (error) {
      alert("Error adding employee");
    }
  };
  const handleViewItems = () => {
    const viewItemsPath = "/viewhumanresource";
    if (location.pathname !== viewItemsPath) {
      window.location.href = viewItemsPath;
    }
  };
  return (
    <FormWrapper>
      {/* <FormHeading className="HeaderHeading">
        Human Resource Inventory
      </FormHeading> */}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="Name" name="name">
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Address" name="address">
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name="email">
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Salary" name="salary">
              <Input
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Hired On" name="hired">
              <Input
                name="hired"
                value={formData.hired}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Designation" name="desgn">
              <Input
                name="desgn"
                value={formData.desgn}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Job Description" name="desgnesc">
              <Input
                name="desgnesc"
                value={formData.desgnesc}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Skills" name="skills">
              <Input
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Tag" name="tag">
              <Input
                name="tag"
                defaultValue={formData.tag}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <ButtonContainer>
            <Button type="primary" onClick={handleSubmit}>
              Add Employee
            </Button>
            <br></br>
            <Button onClick={handleViewItems}>View Employee</Button>
          </ButtonContainer>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default HumanresourceForm;
