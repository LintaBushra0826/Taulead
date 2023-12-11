import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col, Divider } from "antd";
import {
  ButtonContainer,
  FormHeading,
} from "../../../humanresource/components/humanResourceForm/index.styled";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AutoComplete } from "antd";
import LimitForm from "./component/limitform";

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
      // setFormData({
      //   Name: "",
      //   Desc: "",
      //   unit: "",
      //   quan: "",
      //   expdate: "",
      //   price: "",
      //   totcost: 0,
      //   tag: "available",
      //   itemlimit: 0,
      // });
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

  // useEffect(() => {
  //   fetchRawMaterials();
  // }, []);

  // const fetchRawMaterials = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3005/rawMaterial");
  //     const rawData = response.data.data;

  //     // Ensure data is an array
  //     const dataArray = Array.isArray(rawData) ? rawData : [];

  //     setData(dataArray); // Set the data array here
  //   } catch (error) {
  //     console.error("Error fetching raw materials:", error);
  //   }
  // };

  return (
    <>
      <FormHeading className="HeaderHeading">
        Raw Material Inventory
      </FormHeading>

      <LimitForm />
      <Divider />

      <Form name="basic" layout="vertical" autoComplete="off">
        <Row gutter={20}>
          {/* <Col span={8}>
            <Form.Item label="Inventory Limit" name="itemlimit">
              <Input
                name="itemlimit"
                defaultValue={formData.itemlimit}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col> */}
          {/* <br />
          <Divider />
          <br /> */}

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
                // style={{ width: 200 }}
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
            <Form.Item label="Total Cost" name="totcost">
              <Input
                name="totcost"
                value={total}
                onChange={handleInputChange}
              />
              {/* console.log("total value", total) */}
              {total}
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
    </>
  );
}

export default RawMaterialForm;
