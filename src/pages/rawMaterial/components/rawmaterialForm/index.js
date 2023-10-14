import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../../../humanresource/components/humanResourceForm/index.styled";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AutoComplete } from "antd";

function RawMaterialForm() {
  const location = useLocation();
  const API_BASE_URL = "http://localhost:3003";
  const [formData, setFormData] = useState({
    quan: "", // Provide initial values for quan and price
    price: "",
  });
  const [searchValue] = useState("");
  const [options, setOptions] = useState([]);

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [total, setTotal] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/rawMaterial`, formData);
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

  const universalUnits = [
    "kg",
    "g",
    "lb",
    "oz",
    "m",
    "cm",
    "mm",
    "in",
    "ft",
    "yd",
    "L",
    "mL",
    "gal",
    "pt",
    "qt",
  ];

  const handleSearch = (value) => {
    // setInputValue(value);
    setOptions(
      universalUnits.filter((unit) =>
        unit.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = async (unit) => {
    try {
      // Update the form data with the selected unit
      handleInputChange({ target: { name: "unit", value: unit } });
    } catch (error) {
      console.error("Error adding unit:", error);
    }
  };

  useEffect(() => {
    const numOne = one;
    const numTwo = two;

    if (!isNaN(numOne) && !isNaN(numTwo)) {
      const result = numOne * numTwo;
      setTotal(result);

    } else {
      setTotal(0);
    }
  }, [one, two]);

  console.log("total", total);

  return (
    <>
      <FormHeading className="HeaderHeading">
        Raw Material Inventory
      </FormHeading>
      <Form name="basic" layout="vertical" autoComplete="on">
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="Item Name" name="Name">
              <Input
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Description" name="Desc">
              <Input
                name="Desc"
                value={formData.Desc}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Unit" name="unit">
              <AutoComplete
                value={searchValue}
                options={options.map((option) => ({ value: option }))}
                onSelect={handleSelect}
                onSearch={handleSearch}
                style={{ width: 200 }}
              >
                <Input
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                />
              </AutoComplete>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Quantity" name="quan">
              <Input
                name="quan"
                value={formData.quan}
                onChange={(e) => setOne(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Expiry Date" name="expdate">
              <Input
                name="expdate"
                value={formData.expdate}
                onChange={handleInputChange}
                // placeholder="2025-10-13"
                type="date"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Item Price" name="price">
              <Input
                name="price"
                value={formData.price}
                onChange={(e) => setTwo(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Total Cost" name="totcost">
              <Input name="totcost" value={total} readOnly />
              {/* console.log("total value", total) */}
              {total}
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

export default RawMaterialForm;
