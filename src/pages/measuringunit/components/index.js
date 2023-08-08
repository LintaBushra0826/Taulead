import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../../humanresource/components/humanResourceForm/index.styled";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MeasuringUnitForm() {
  const location = useLocation();
  const API_BASE_URL = "http://localhost:3003";
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/MeasuringUnit`, formData);
      alert("Unit added successfully!");
    } catch (error) {
      alert("Error adding measuring unit");
    }
  };
  const handleViewItems = () => {
    // Use the useLocation hook to navigate
    const viewItemsPath = "/viewmeasuringunits";
    if (location.pathname !== viewItemsPath) {
      window.location.href = viewItemsPath;
    }
  };
  return (
    <>
      <FormHeading className="HeaderHeading">Measuring Units</FormHeading>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <div className="formdiv">
          <Form.Item label="Unit Name" name="name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Unit Description" name="desc">
            <Input  name="desc"
              value={formData.desc}
              onChange={handleInputChange}/>
          </Form.Item>

          <Form.Item label="Unit Type" name="type">
            <Input  name="type"
              value={formData.type}
              onChange={handleInputChange}/>
          </Form.Item>

          <Form.Item label="Unit Scale" name="scale">
            <Input  name="scale"
              value={formData.scale}
              onChange={handleInputChange}/>
          </Form.Item>
        </div>

        <ButtonContainer>
          <Button type="primary" onClick={handleSubmit}>
            Add Unit
          </Button>
          <br></br>
          <Button onClick={handleViewItems}>View Units</Button>
        </ButtonContainer>
      </Form>
    </>
  );
}

export default MeasuringUnitForm;
