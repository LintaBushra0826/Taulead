import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col, Divider } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../../../humanresource/components/humanResourceForm/index.styled";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AutoComplete } from "antd";
import { FormWrapper } from "./index.style";
// import LimitForm from "./component/limitform";

function RawMaterialForm() {
  const location = useLocation();
  const API_BASE_URL = "http://localhost:3005";
  const [formData, setFormData] = useState({
    Name: "",
    Desc: "",
    unit: "",
    quan: "",
    expdate: "",
    price: "",
    totcost: 0,
    tag: "available",
    itemlimit: 0,
  });
  const [searchValue] = useState("");
  const [options, setOptions] = useState([]);
  const [data, setData] = useState(null);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [total, setTotal] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Check the name of the input field and set the appropriate state variable
    if (name === "price") {
      setOne(value);
    } else if (name === "quan") {
      setTwo(value);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/rawMaterial`, formData);
      alert("Raw material item added successfully!");
      window.location.reload();
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
      setFormData({ ...formData, totcost: result });
    } else {
      setTotal(0);
      setFormData({ ...formData, totcost: 0 });
    }
  }, [one, two]);

  console.log("total", total);

  return (
    <>
      <FormWrapper>
        <Form name="basic" layout="vertical" autoComplete="off">
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
                <div style={{ display: "flex" }}>
                  <AutoComplete
                    placeholder={searchValue}
                    options={options.map((option) => ({ value: option }))}
                    onSelect={handleSelect}
                    onSearch={handleSearch}
                    style={{ flex: "1" }}
                  >
                    <Input
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      style={{
                        border: "1px solid #ccc",
                        color: "#555",
                        flex: "1",
                      }}
                    />
                  </AutoComplete>

                  <Link to="/measuringunit">
                    <Button
                      type="text"
                      style={{
                        marginLeft: "8px",
                        background: "#f5f5f5",
                        fontSize: "12px",
                      }}
                    >
                      Customize..
                    </Button>
                  </Link>
                </div>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Item Quantity" name="quan">
                <Input
                  name="quan"
                  value={formData.quan}
                  // onChange={(e) => setOne(e.target.value)}
                  onChange={handleInputChange}
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
                  // onChange={(e) => setTwo(e.target.value)}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Item Limit" name="itemlimit">
                <Input
                  name="itemlimit"
                  value={formData.itemlimit}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Total Cost" name="totcost">
                <Input
                  name="totcost"
                  value={total}
                  placeholder={total}
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
                Add Item
              </Button>
              <br></br>
              <Button onClick={handleViewItems}>View Item</Button>
            </ButtonContainer>
          </Form.Item>
        </Form>
      </FormWrapper>
    </>
  );
}

export default RawMaterialForm;
