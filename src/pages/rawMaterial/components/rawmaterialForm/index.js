import React, { useState } from "react";
import { Input, Form, Button, Row, Col } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../../../humanresource/components/humanResourceForm/index.styled";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";


function rawMaterialForm() {
  const location = useLocation(); // Import the useLocation hook
  const API_BASE_URL = "http://localhost:3003"; 
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/rawMaterial`, formData);
      // Assuming your backend is running on the same host and port as the frontend
      alert("Raw material item added successfully!");
    } catch (error) {
      alert("Error adding raw material item");
    }
  };
  const handleViewItems = () => {
    // Use the useLocation hook to navigate
    const viewItemsPath = "/viewrawmaterial";
    if (location.pathname !== viewItemsPath) {
      window.location.href = viewItemsPath;
    }
  };

  return (
    <>
      <FormHeading className="HeaderHeading">
        Raw Material Inventory
      </FormHeading>
      <Form name="basic" layout="vertical" autoComplete="off">
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              label="Item Name"
              name="Name"
            >
              <Input name="Name" value={formData.Name} onChange={handleInputChange} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Description" name="Desc">
              <Input name="Desc" value={formData.Desc} onChange={handleInputChange} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Unit" name="unit">
              <Input name="unit" value={formData.unit} onChange={handleInputChange} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Quantity" name="quan">
              <Input name="quan" value={formData.quan} onChange={handleInputChange} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Expiry Date" name="expdate">
              <Input name="expdate" value={formData.expdate} onChange={handleInputChange} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Price" name="price">
              <Input name="price" value={formData.price} onChange={handleInputChange} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Total Cost" name="totcost">
              <Input name="totcost" value={formData.totcost} onChange={handleInputChange} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <ButtonContainer>
            <Button type="primary" onClick={handleSubmit}>
              Add Item
            </Button>
            <br></br>
            <Button onClick={handleViewItems}>View Item</Button>
            
          </ButtonContainer>
        </Form.Item>
      </Form>
    </>
  );
}

export default rawMaterialForm;
